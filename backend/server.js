/* eslint-disable no-console */
/**
 * Created by Piyush
 * Initial structure
 */

// REQUIRES
const express = require("express");
const routeResources = require("node-resources");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./config/database.config.js");
const globalConnect = require("./config/connect.config.js");
// application config
const envConfig = require("./config/env.config");

// global imports
global.mongoose = require("mongoose");
global.jwt = require("jsonwebtoken");
global.async = require("async");
global.ResponseWrapper = require("./utils/ResponseWrapper");
global.EncryptionWrapper = require("./utils/EncryptionWrapper");
global.TokenWrapper = require("./utils/TokenWrapper");
global.QueryWrapper = require("./utils/QueryWrapper");

// require static files

// create express app
app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// Enable cors
app.use(cors());
// parse requests of content-type - application/json
app.use(bodyParser.json());

// Require Notes routes
routeResources.registerRoutes(app, {
  path: `${__dirname}/resources/`,
  pattern: "[folder].routes.js",
});
app.use((req, res, next) => {
  res.status(405).send({
    status: 405,
    error: "Method not allowed",
  });
  next();
});
// listen for requests
app.listen(envConfig[envConfig.current_env].port, () => {
  console.log(
    `Server is listening on port ${envConfig[envConfig.current_env].port}`
  );
});

// mongoose.Promise = global.Promise;

// // Connecting to the database
  globalConnect.databaseConnect(dbConfig[envConfig.current_env]).then(function(){
    console.log("Successfully connected to the database");
  }).catch(function(){
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

  module.exports = app;