'use strict';

var express = require('express');
var router = express.Router();
var debug = require('debug')('classhelper:routes:index');
module.exports = function(db) {
  /* GET home page. */
  var courseManager = require("../model/courseModel")(db);
  router.get('/', function(req, res, next) {
    var username = '', role = '';
    var exist = false;
    if (req.session.user) {
      username = req.session.user.username;
      role = req.session.user.role;
      exist = true;
      
    }
    var user = {
      username: username,
      role: role
    };
    courseManager.findAllCourses(username).then(function(result){
      res.render('index', {
        title: '课堂签到',
        exist: exist,
        user: user,
        courses: result,
        register_error: {},
        login_error: {}
      });
   });
  });
  return router;
};