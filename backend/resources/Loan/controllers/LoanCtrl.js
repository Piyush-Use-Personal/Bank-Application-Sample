const User = require("../../User/model/User");
const Loan = require("../model/Loan");
const Auth = require('../../User/model/Auth');

/**
 * Created by Piyush on Thu Nov 26 2020 21:00:31 GMT+0530 (India Standard Time)
 * Loan Management - CRUD , along with the Approval Mechanism of the same
 * Updated by Piyush on Thu Nov 26 2020 21:00:31 GMT+0530 (India Standard Time)
 * Loan Management - CRUD , along with the Approval Mechanism of the same
 */

 function loanValidation(data) {
  let json = {
    isValidated: true,
    body: data,
  };
  if (data) {
    json.isValidated = true;
  } else {
    json.isValidated = false;
  }
  return json;
}
function LoanCtrl() {
  /**
   * Created by Piyush on Thu Nov 26 2020 21:00:31 GMT+0530 (India Standard Time)
   * Loan Management - CRUD , along with the Approval Mechanism of the same
   * Updated by Piyush on Thu Nov 26 2020 21:00:31 GMT+0530 (India Standard Time)
   * Loan Management - CRUD , along with the Approval Mechanism of the same
   */

  this.generateLoan = function (req, res, next) {
    try {
      async.waterfall(
        [
          function validation(callback) {
            let validatedData = loanValidation(req.body);
            if (validatedData.isValidated) {
              callback(null, validatedData.body);
            } else {
              callback(603);
            }
          },
          function validateUser(data, callback) {
            async.parallel(
              {
                requestorValidation: function (innerCallback) {
                  var query = QueryWrapper.userVerification(data.userId);
                  Auth.findOne(query, function (err, result) {
                    if (err) {
                      innerCallback(err);
                    } else if (!result) {
                      innerCallback(500);
                    } else {
                      innerCallback(null, result);
                    }
                  });
                },
                agentValidation: function (innerCallback) {
                  var query = QueryWrapper.userVerification(data.createdBy);
                  Auth.findOne(query, function (err, result) {
                    if (err) {
                      innerCallback(err);
                    } else if (!result) {
                      innerCallback(500);
                    } else {
                      User.findOne(
                        { ...query, ...{ userRole: "agent" } },
                        function (err, result) {
                          if (err) {
                            innerCallback(err);
                          } else if (!result) {
                            innerCallback(401);
                          } else {
                            innerCallback(null, result);
                          }
                        }
                      );
                    }
                  });
                },
                guarantorValidation: function (innerCallback) {
                  var query = QueryWrapper.userVerification(data.guarantor);
                  Auth.findOne(query, function (err, result) {
                    if (err) {
                      innerCallback(err);
                    } else if (!result) {
                      innerCallback(500);
                    } else {
                      innerCallback(null, result);
                    }
                  });
                },
              },
              function (err, doc) {
                if (err) {
                  callback(err);
                } else {
                  callback(null, data);
                }
              }
            );
          },
          function saveLoan(data, callback) {
            data.loanId = "L" + Date.now();
            let loanObject = new Loan(data);
            loanObject.save(function (err, result) {
              if (err) {
                callback(err);
              } else if (!result) {
                callback(500);
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
            ResponseWrapper.SuccessResponse(200, res, doc, "generateLoan");
          }
        }
      );
    } catch (error) {
      ResponseWrapper.FailedResponse(error, res);
    }
  };

  this.updateApprovalStatus = function (req, res, next) {
    try {
      async.waterfall(
        [
          function validation(callback) {
            if (
              req.body &&
              req.body.loanId &&
              req.body.userId &&
              req.body.status
            ) {
              callback(null, req.body);
            } else {
              callback(603);
            }
          },
          function validateUser(data, callback) {
            User.findOne(
              { userId: data.userId, userRole: "admin" },
              function (err, result) {
                if (err) {
                  callback(err);
                } else if (!result) {
                  callback(500);
                } else {
                  callback(null, data);
                }
              }
            );
          },
          function approveLoan(data, callback) {
            var query = {
                loanId: data.loanId,
                ["is" + req.body.status]: false,
              },
              update = {
                ["is" + req.body.status]: true,
              },
              option = {
                upsert: false,
                new
            : true,
              };
            Loan.findOneAndUpdate(
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
            ResponseWrapper.SuccessResponse(200, res, doc, "approveLoan");
          }
        }
      );
    } catch (error) {
      ResponseWrapper.FailedResponse(error, res);
    }
  };
}
module.exports = new LoanCtrl();
