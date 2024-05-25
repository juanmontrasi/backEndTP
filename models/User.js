class User {
    constructor(userId, userName, userAddress, userType, userTaxCondition) {
      this.userId = userId;
      this.userName = userName;
      this.userAddress = userAddress;
      this.userType = userType;
      this.userTaxCondition = userTaxCondition;
    }
  
    
    getUserId() {
      return this.userId;
    }
  
    setUserId(userId) {
      this.userId = userId;
    }
  
    getUserName() {
      return this.userName;
    }
  
    setUserName(userName) {
      this.userName = userName;
    }
  
    getUserAddress() {
      return this.userAddress;
    }
  
    setUserAddress(userAddress) {
      this.userAddress = userAddress;
    }
  
    getUserType() {
      return this.userType;
    }
  
    setUserType(userType) {
      this.userType = userType;
    }
  
    getUserTaxCondition() {
      return this.userTaxCondition;
    }
  
    setUserTaxCondition(userTaxCondition) {
      this.userTaxCondition = userTaxCondition;
    }
  }
  
  module.exports = User;