import nodemailer from 'nodemailer';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();


export class EmailService {
    sendReceipt = async (user, order, items) => {
        try {
            const filePath = await this.generatePdfReceipt(user, order, items);
            await this.sendEmail(user, filePath);
            this.deleteTemporalFile(filePath);

            return true;
        } catch (error) {
            return false;
        }

    }

    generatePdfReceipt = async (user, order, items) => {
        // Crear el recibo en PDF
        const doc = new PDFDocument();
        const filePath = path.join(process.cwd(), `recibo-${Date.now()}.pdf`);
        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);

        // Encabezado
        doc.fontSize(30).text('Recibo de Compra', { align: 'center' });
        doc.moveDown();
        doc.fontSize(14).text(`Pedido: ${order.id_pedidos}`);
        doc.fontSize(14).text(`Cliente: ${user.nombre}`);
        doc.text(`Correo: ${user.email}`);
        doc.text(`Fecha: ${new Date().toLocaleDateString()}`);
        doc.text(`Total: $${order.total}`);
        doc.moveDown();

        // Detalle de los productos
        doc.fontSize(14).text('----------------------------------------------------------------------------------------------------');
        doc.fontSize(16).text('Detalles de la compra:');
        doc.moveDown()
        items.forEach((item, index) => {
            doc.fontSize(14).text(`${index + 1}. ${item.nombre_producto} - $${item.precio} x ${item.cantidad} = $${item.subtotal}`);
        });

        for (let i = 0; i < 19; i++) {
            doc.moveDown();
        }
        doc.fontSize(10).text('Gracias por elegirnos. Recuerda que puedes retirar tu pedido en nuestra tienda ubicada en Pasco 1980 de lunes a viernes de 8 AM a 5 PM.', { align: 'center' });
        doc.text('Si tienes alguna pregunta o necesitas asistencia, no dudes en contactarnos. ¡Te esperamos pronto!', { align: 'center' });

        // Pie de página con datos de contacto
        doc.moveDown();
        doc.text('CompraGamer - Teléfono: (123) 456-7890 - Email: compragamersa@gmail.com', { align: 'center' });
        doc.end();

        await new Promise((resolve) => stream.on('finish', resolve));
        return filePath;
    }

    deleteTemporalFile = (filePath) => {
        fs.unlinkSync(filePath);
    }

    sendEmail = async (user, filePath) => {
        // Configuración de transporte de nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });
        // Configuración del correo
        const mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: 'Recibo de tu compra',
            text: `Estimado/a ${user.nombre},

        ¡Gracias por tu compra en CompraGamer! Adjunto encontrarás el recibo de tu compra.
            
        Te recordamos que podrás retirar y pagar por tu pedido en nuestro local, ubicado en Pasco 1980, de lunes a viernes de 8AM a 5PM. 
            
        Si tienes alguna consulta o necesitas asistencia, no dudes en contactarnos.
            
        ¡Esperamos verte pronto para ofrecerte más productos de tecnología de calidad!
            
        Saludos cordiales,  
        El equipo de CompraGamer`,
            attachments: [
                {
                    filename: 'Recibo-Compra.pdf',
                    path: filePath,
                },
            ],
        };

        try {
            const info = await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Error al enviar el correo:', error);
        }

    }
}