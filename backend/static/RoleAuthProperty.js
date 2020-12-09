var AuthCore = require("../utils/TokenWrapper");
var ErrorMessage = require('../static/StatusMessages').errorCodes;
var Role = require("../config/userRole.config");

const AdminAuthentication = (req, res, next) => {
  CheckAuthentication(req, res, next, "admin");
};
const AgentAuthentication = (req, res, next) => {
  CheckAuthentication(req, res, next, "agent");
};
const CustomerAuthentication = (req, res, next) => {
  CheckAuthentication(req, res, next, "customer");
};
const SharedAdminAgentAuthentication = (req, res, next) => {
  CheckAuthentication(req, res, next, "admin", "agent");
};
const CheckAuthentication = async (req, res, next, role, alsoCheckFor) => {
  let authData = await AuthCore.authenticate(req.headers, Role.token[role]);
  if (authData.isAuthenticated) {
    req.user = authData.user;
    next();
  } else {
    if (alsoCheckFor) {
      let otherAuthData = await AuthCore.authenticate(
        req.headers,
        Role.token[alsoCheckFor]
      );
      if (otherAuthData.isAuthenticated) {
        req.user = otherAuthData.user;
        next();
      } else {
        res.status(otherAuthData.code).send({
          "message" : ErrorMessage[otherAuthData.code]
        })
      }
    } else {
      res.status(authData.code).send( {
        "message" : ErrorMessage[authData.code]
      })
    }
  }
};

const generateToken = (data, role) => {
  return AuthCore.generateAccessToken(data, role, Role.duration);
}

module.exports = {
  AdminAuthentication: AdminAuthentication,
  AgentAuthentication: AgentAuthentication,
  CustomerAuthentication: CustomerAuthentication,
  SharedAdminAgentAuthentication : SharedAdminAgentAuthentication,
  generateToken: generateToken
};
