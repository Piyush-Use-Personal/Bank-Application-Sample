/**
 * Created by Piyush on 26/9/2020.
*/
var messages = require('../static/StatusMessages');
var error_pointer = 'codes'
function SuccessResponse (code, res, responseObj, message) {
    var response = {};
    response.code = code;
    response.result = responseObj;
    if (code !== 200) {
      response.message = messages[error_pointer][code];
    } else {
      response.message = message;
    }
    res.status(200).send(response);
  }

function FailedResponse(err, res){
  var err_codes = Object.keys(messages[error_pointer]);
  if (err_codes.indexOf(err.toString()) !== -1) {
    SuccessResponse(err, res, {})
  } else {
    InternalServerResponse(err, res);
  }

};

function InternalServerResponse(error, res){
    res.status(500).send({'error' : error.message});
}
  
  /// --- Exports
  module.exports = {
    SuccessResponse: SuccessResponse,
    InternalServerResponse : InternalServerResponse,
    FailedResponse: FailedResponse
  };
  
