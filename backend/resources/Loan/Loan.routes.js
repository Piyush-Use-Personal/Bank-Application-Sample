/**
 * Created by Piyush on Thu Nov 26 2020 21:00:31 GMT+0530 (India Standard Time)
 * Loan Management - CRUD , along with the Approval Mechanism of the same
 * Updated by Piyush on Thu Nov 26 2020 21:00:31 GMT+0530 (India Standard Time)
 * Loan Management - CRUD , along with the Approval Mechanism of the same
 */


var LoanCtrl = require('./controllers/LoanCtrl');
var RoleProperty = require('../../static/RoleAuthProperty');

module.exports = function (app) {
  /**
 * Created by Piyush on Thu Nov 26 2020 21:00:31 GMT+0530 (India Standard Time)
 * Loan Management - CRUD , along with the Approval Mechanism of the same
 * Updated by Piyush on Thu Nov 26 2020 21:00:31 GMT+0530 (India Standard Time)
 * Loan Management - CRUD , along with the Approval Mechanism of the same
 */

  app.get('/v1/generateLoan', RoleProperty.AgentAuthentication, LoanCtrl.generateLoan);
}
