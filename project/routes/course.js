'use strict';

var express = require("express");
var router = express.Router();

module.exports = function(db) {
	var courseManager = require('../model/courseModel')(db);

	router.post('/create', function(req, res, next) {
		
        courseManager.insertCourse(req.session.user.username, req.body.coursename);
        
		res.redirect('/');
	});

	router.all('*', function(req, res, next) {
		if (req.session.user) {
			next();
		} else {
			res.redirect('/');
		}
	});

	router.get('/create', function(req, res, next) {
		res.render("course_create")
	});

	router.get('/record', function(req, res, next) {
		courseManager.findAllCourses(req.session.user.username).then(function(result) {
			
			var user = {
				username: req.session.user.username,
				role: req.session.user.role
			};
			res.render('courses', { exist: true, user: user, records: result, title: '课程信息' });
		});
    });
    router.post('/delete', function(req, res, next){
       courseManager.deleteCourse(req.session.user.username, req.body.coursename).then(function(result){
            res.redirect('/course/record');
       });
    });

	return router;
};



