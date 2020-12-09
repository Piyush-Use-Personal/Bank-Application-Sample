/**
 * Created by Piyush on Thu Nov 26 2020 19:59:53 GMT+0530 (India Standard Time)
 *  User Management Model and Controller which will handle all CRUD and BL 
 * Updated by Piyush on Thu Nov 26 2020 19:59:53 GMT+0530 (India Standard Time)
 *  User Management Model and Controller which will handle all CRUD and BL 
 */

const UserRole = ['customer', 'agent', 'admin']
module.exports = (function UserSchema () {
    var Schema = mongoose.Schema;
  
    var UserSchema = new Schema({
      userId: { type: String, trim: true, required: true },
      name: { type: String, trim: true, required: true },
      address: { type: String, trim: true, required: true },
      emailId: { type: String, trim: true, required: true },
      mobileNumber: { type: String, trim: true, required: true },
      userRole : {type: String, enum: UserRole},
      createdBy: { type: String, trim: true },
      updatedBy: { type: String, trim: true },
      accountProof : [
        {
          type: { type: String, trim: true },
          Number: { type: String, trim: true },
        }
      ],
      balance : {type : Number}
    }, {timestamps: true} );
  
    var User = mongoose.model('User', UserSchema);
  
    return User;
  })();
  