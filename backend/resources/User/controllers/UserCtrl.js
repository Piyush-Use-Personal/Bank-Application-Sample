/**
 * Created by Piyush on Thu Nov 26 2020 19:59:53 GMT+0530 (India Standard Time)
 *  User Management Model and Controller which will handle all CRUD and BL
 * Updated by Piyush on Thu Nov 26 2020 19:59:53 GMT+0530 (India Standard Time)
 *  User Management Model and Controller which will handle all CRUD and BL
 */

const Auth = require("../model/Auth");
var RoleProperty = require('../../../static/RoleAuthProperty');
var User = require('../model/User');
function UserCtrl() {
  /**
   * Created by Piyush on Thu Nov 26 2020 19:59:53 GMT+0530 (India Standard Time)
   *  User Management Model and Controller which will handle all CRUD and BL
   * Updated by Piyush on Thu Nov 26 2020 19:59:53 GMT+0530 (India Standard Time)
   *  User Management Model and Controller which will handle all CRUD and BL
   */

  this.RegisterUser = function (req, res, next) {
    try {
      async.waterfall(
        [
          function validation(callback) {
            if (
              req.body &&
              req.body.name &&
              req.body.address &&
              req.body.balance &&
              req.body.emailId &&
              req.body.mobileNumber &&
              req.body.password &&
              req.body.createdBy
            ) {
              callback(null, req.body);
            } else {
              callback(603);
            }
          },
          function checkUserExist(data, callback) {
            let query = { emailId: data.emailId };
            User.findOne(query, function (err, result) {
              if (err) {
                callback(err);
              } else if (!result) {
                callback(null, data);
              } else {
                callback(708);
              }
            });
          },
          function createQuery(data, callback) {
            let params = {
              query: {},
              update: {},
              option: { new: true },
            };
            if (data.userId) {
              params.option.upsert = false;
            } else {
              params.option.upsert = true;
              data.userId = "user" + Date.now();
            }
            params.query.userId = data.userId;
            data.isDeleted = false;
            params.update = data;
            params.update.password = EncryptionWrapper.encrypt(
              params.update.password
            );
            callback(null, params);
          },
          function saveintoDatabase(params, callback) {
            User.findOneAndUpdate(
              params.query,
              params.update,
              params.option,
              function (err, result) {
                if (err) {
                  callback(err);
                } else if (!result) {
                  callback(500);
                } else {
                  callback(null, params.update);
                }
              }
            );
          },
          function createAuthRegistry(data, callback) {
            data.isEmailIdVerified = false;
            data.isMobileNumberVerified = false;
            var authObject = new Auth(data);
            authObject.save(function (err, result) {
              if (err) {
                callback(err);
              } else {
                callback(null, result);
              }
            });
          },
        ],
        function (err, doc) {
          if (err) {
            ResponseWrapper.FailedResponse(err, res);
          } else {
            ResponseWrapper.SuccessResponse(200, res, doc, "RegisterUser");
          }
        }
      );
    } catch (error) {
      ResponseWrapper.FailedResponse(error, res);
    }
  };

  this.verifyAccount = function (req, res, next) {
    try {
      async.waterfall(
        [
          function validation(callback) {
            if (req.body && req.body.emailId && req.body.mobileNumber) {
              callback(null, req.body);
            } else {
              callback(603);
            }
          },
          function checkIfExist(data, callback) {
            var query = {
              emailId: data.emailId,
              mobileNumber: data.mobileNumber,
            };
            Auth.findOne(query, function (err, result) {
              if (err) {
                callback(err);
              } else if (!result) {
                callback(500);
              } else {
                callback(null, query); // pass the query
              }
            });
          },
          function updateRecord(query, callback) {
            var update = {
                isMobileNumberVerified: true,
                isEmailIdVerified: true,
              },
              option = {
                upsert: false,
                new: true,
              };
            Auth.findOneAndUpdate(
              query,
              update,
              option,
              function (err, result) {
                if (err) {
                  callback(err);
                } else if (!result) {
                  callback(500);
                } else {
                  callback(null, result);
                }
              }
            );
          },
        ],
        function (err, doc) {
          if (err) {
            ResponseWrapper.FailedResponse(err, res);
          } else {
            ResponseWrapper.SuccessResponse(200, res, doc, "verifyAccount");
          }
        }
      );
    } catch (error) {
      ResponseWrapper.FailedResponse(error, res);
    }
  };

  this.getAllUser = function (req, res, next) {
    try {
      async.waterfall(
        [
          function getAllUser(callback) {
            User.find(
              { },
              { _id: 0, __v: 0 },
              function (err, result) {
                if (err) {
                  callback(err);
                } else if (result.length === 0) {
                  callback(500);
                } else {
                  callback(null, result);
                }
              }
            );
          },
        ],
        function (err, doc) {
          if (err) {
            ResponseWrapper.FailedResponse(err, res);
          } else {
            ResponseWrapper.SuccessResponse(200, res, doc, "getAllUser");
          }
        }
      );
    } catch (error) {
      ResponseWrapper.FailedResponse(error, res);
    }
  };

  this.checkPassword = function (req, res, next) {
    try {
      async.waterfall(
        [
          function validation(callback) {
            if (req.body && req.body.emailId && req.body.password) {
              callback(null, req.body);
            } else {
              callback(603);
            }
          },
          function checkPassword(data, callback) {
            var query = {
              emailId: data.emailId,
              password: EncryptionWrapper.encrypt(data.password),
              isMobileNumberVerified : true,
              isEmailIdVerified : true
            };
            Auth.findOne(query, function (err, result) {
              if (err) {
                callback(err);
              } else if (!result) {
                callback(500);
              } else {
                callback(null, result);
              }
            });
          },
          function generateToken(data, callback) {
              let token = RoleProperty.generateToken(data, data.userRole);
              callback({...data, ...{token : token}});
          }
        ],
        function (err, doc) {
          if (err) {
            ResponseWrapper.FailedResponse(err, res);
          } else {
            ResponseWrapper.SuccessResponse(200, res, doc, "checkPassword");
          }
        }
      );
    } catch (error) {
      ResponseWrapper.FailedResponse(error, res);
    }
  };
}
module.exports = new UserCtrl();
