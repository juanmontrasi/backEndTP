-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: tp_desarrollo_mod
-- ------------------------------------------------------
-- Server version	8.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `id_pedidos` int NOT NULL AUTO_INCREMENT,
  `fecha_pedido` datetime NOT NULL,
  `total` float DEFAULT NULL,
  `id_cliente` int NOT NULL,
  PRIMARY KEY (`id_pedidos`),
  KEY `id_cliente_idx` (`id_cliente`),
  CONSTRAINT `fk_usuarios_id_usuarios` FOREIGN KEY (`id_cliente`) REFERENCES `usuarios` (`id_usuarios`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
INSERT INTO `pedidos` VALUES (60,'2024-11-20 13:28:23',4199,33),(61,'2024-11-20 13:55:43',4347,33),(62,'2024-11-20 14:00:18',5396,30),(63,'2024-11-20 14:03:20',4099,33),(64,'2024-11-20 14:19:46',1600,33),(65,'2024-11-20 14:21:04',6000,33),(66,'2024-11-20 14:24:30',3000,33),(67,'2024-11-20 14:25:55',1500,33),(68,'2024-11-20 14:26:13',800,33),(69,'2024-11-20 14:31:37',800,33),(70,'2024-11-20 14:33:15',800,33),(71,'2024-11-20 14:34:12',800,33),(72,'2024-11-20 14:36:21',7200,33),(73,'2024-11-20 14:37:47',8800,33),(75,'2024-11-20 15:55:35',2400,33),(76,'2024-11-20 16:21:11',800,33),(77,'2024-11-20 18:05:15',899,33);
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id_productos` int NOT NULL AUTO_INCREMENT,
  `nombre_producto` varchar(45) NOT NULL,
  `desc_producto` varchar(255) NOT NULL,
  `stock` int NOT NULL,
  `precio` float NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_productos`),
  UNIQUE KEY `id_productos_UNIQUE` (`id_productos`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Grafica Nvidia RTX 4060 Ti','Potente tarjeta gráfica para gaming y diseño.',19,800,'grafica-nvidia.jpg'),(2,'Acer Nitro V 15.6\"','Alta performance para gaming y multitarea.',15,1500,'laptop-gamer.jpg'),(3,'Auriculares JBL Quantum 910','Sonido de alta calidad',35,299,'auriculares.jpg'),(4,'Memoria Team DDR5 32GB','Velocidad y eficiencia',11,899,'memoria-ram.jpg'),(6,'Monitor 4K Curvo','Experiencia visual inmersiva para tu escritorio.',14,349,'monitor.jpg'),(7,'Teclado Mecanico','Teclado mecanico 90% alta calidad',80,500,'teclado-mecanico.jpg');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos_pedidos`
--

DROP TABLE IF EXISTS `productos_pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos_pedidos` (
  `id_pedidos` int NOT NULL,
  `id_producto` int NOT NULL,
  `cantidad` int NOT NULL,
  `subtotal` int NOT NULL,
  PRIMARY KEY (`id_pedidos`,`id_producto`),
  KEY `id_pedido_idx` (`id_pedidos`),
  KEY `fk_productos_id_productos_idx` (`id_producto`),
  CONSTRAINT `fk_productos_id_productos` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_productos`),
  CONSTRAINT `fk_productos_pedidos_id_pedidos` FOREIGN KEY (`id_pedidos`) REFERENCES `pedidos` (`id_pedidos`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos_pedidos`
--

LOCK TABLES `productos_pedidos` WRITE;
/*!40000 ALTER TABLE `productos_pedidos` DISABLE KEYS */;
INSERT INTO `productos_pedidos` VALUES (60,1,3,2400),(60,2,1,1500),(60,3,1,299),(61,1,1,800),(61,2,1,1500),(61,3,1,299),(61,4,1,899),(61,6,1,349),(61,7,1,500),(62,2,2,3000),(62,3,2,598),(62,4,2,1798),(63,1,1,800),(63,2,2,3000),(63,3,1,299),(64,1,2,1600),(65,2,4,6000),(66,2,2,3000),(67,2,1,1500),(68,1,1,800),(69,1,1,800),(70,1,1,800),(71,1,1,800),(72,1,9,7200),(73,1,11,8800),(75,1,3,2400),(76,1,1,800),(77,4,1,899);
/*!40000 ALTER TABLE `productos_pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuarios` int NOT NULL AUTO_INCREMENT,
  `nombre_usuario` varchar(45) NOT NULL,
  `clave` varchar(45) NOT NULL,
  `tipo_usuario` int NOT NULL,
  `email` varchar(45) NOT NULL,
  `telefono` varchar(45) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `direccion` varchar(45) NOT NULL,
  PRIMARY KEY (`id_usuarios`),
  UNIQUE KEY `id_usuarios_UNIQUE` (`id_usuarios`),
  UNIQUE KEY `nombre_usuario_UNIQUE` (`nombre_usuario`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (30,'carlosg','1234567',2,'carlosgomez@gmail.com','345823913','Carlos','Garcia','Brassey 363'),(33,'juanm','1234',1,'juanm@gmai.com','123','Juan','Montrasi','Venezuela 681 bis');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-20 15:07:21
