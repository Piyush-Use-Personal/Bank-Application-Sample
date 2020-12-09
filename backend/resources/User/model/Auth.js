/**
 * Created by Piyush on Thu Nov 26 2020 19:59:53 GMT+0530 (India Standard Time)
 *  Maintain the track of all user authentication process along with it's history 
 * Updated by Piyush on Thu Nov 26 2020 19:59:53 GMT+0530 (India Standard Time)
 *  Maintain the track of all user authentication process along with it's history 
 */


module.exports = (function UserAuthSchema () {
    var Schema = mongoose.Schema;
  
    var UserAuthSchema = new Schema({
      userId: { type: String, trim: true, required: true },
      emailId: { type: String, trim: true, required: true },
      mobileNumber: { type: String, trim: true, required: true },
      isEmailIdVerified : {type: Boolean},
      isMobileNumberVerified : {type: Boolean},
      password : {type: String, trim: true, required: true}
    }, {timestamps: true} );
  
    var UserAuth = mongoose.model('UserAuth', UserAuthSchema);
  
    return UserAuth;
  })();
  