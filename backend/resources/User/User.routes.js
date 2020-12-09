/**
 * Created by Piyush on Thu Nov 26 2020 19:59:53 GMT+0530 (India Standard Time)
 *  User Management Model and Controller which will handle all CRUD and BL 
 * Updated by Piyush on Thu Nov 26 2020 19:59:53 GMT+0530 (India Standard Time)
 *  User Management Model and Controller which will handle all CRUD and BL 
 */


var UserCtrl = require('./controllers/UserCtrl');
var RoleProperty = require('../../static/RoleAuthProperty');

module.exports = function (app) {
  /**
 * Created by Piyush on Thu Nov 26 2020 19:59:53 GMT+0530 (India Standard Time)
 *  User Management Model and Controller which will handle all CRUD and BL 
 * Updated by Piyush on Thu Nov 26 2020 19:59:53 GMT+0530 (India Standard Time)
 *  User Management Model and Controller which will handle all CRUD and BL 
 */
  app.post('/v1/registerUser', UserCtrl.RegisterUser);
  app.post('/v1/verifyAccount', UserCtrl.verifyAccount);
  app.get('/v1/getAllUser', UserCtrl.getAllUser);
  app.post('/v1/checkPassword', UserCtrl.checkPassword);
}
