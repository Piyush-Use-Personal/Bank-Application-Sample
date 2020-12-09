function authenticateToken(headers, accessToken) {
  // Gather the jwt access token from the request header
  return new Promise(function (resolve, reject) {
    try {
      let data = {};
      const authHeader = headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (!token) {
        // if there isn't any token
        data.isAuthenticated = false;
        data.code = 401;
      } else {
        jwt.verify(token, accessToken, (err, user) => {
          if (err) {
            data.isAuthenticated = false;
            data.code = 403;
          } else {
            data.isAuthenticated = true;
            data.user = user;
          }
          // pass the execution off to whatever request the client intended
        });
      }
      resolve(data);
    } catch (error) {
      console.log(error);
      resolve({
        isAuthenticated: false,
        code: 500,
      });
    }
  });
}

/**
 *
 * @param {Data which needs to be pass over the token} data
 */
function generateAccessToken(data, accessToken, expiry) {
  // expires after half and hour (1800 seconds = 30 minutes)
  return jwt.sign(data, accessToken, { expiresIn: expiry });
}
module.exports = {
  authenticate: authenticateToken,
  generateAccessToken: generateAccessToken,
};
