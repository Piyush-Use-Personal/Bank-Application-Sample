
  function userVerification(userId) {
      return {
        userId: userId,
        isMobileNumberVerified : true,
        isEmailIdVerified : true
    }
  }
  /// --- Exports
  module.exports = {
    userVerification : userVerification
  };
  
