"use strict";

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || "development";

require("newrelic");
var express = require("express");
var config = require("./config");

// Setup server
var app = express();
var http = require("http");

// Express configuration
require("./config/express")(app);
// Route configuration
require("./routes")(app);

// Start server
http.createServer(app).listen(config.port, function () {
  console.log("Express server listening on %d, in %s mode", config.port, app.get("env"));
});

// Expose app
exports = module.exports = app;

if (require.main === module) {
  //Comment this app.start line and add following lines
  //app.start();
  app.io = require('socket.io')(app.start());
  require('socketio-auth')(app.io, {
    authenticate: function (socket, value, callback) {

      var AccessToken = app.models.AccessToken;
      //get credentials sent by the client
      var token = AccessToken.find({
        where: {
          and: [{
            userId: value.userId
          }, {
            id: value.id
          }]
        }
      }, function (err, tokenDetail) {
        if (err) throw err;
        if (tokenDetail.length) {
          callback(null, true);
        } else {
          callback(null, false);
        }
      }); //find function..
    } //authenticate function..
  });

  app.io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
      console.log('user disconnected');
    });
  });
}
