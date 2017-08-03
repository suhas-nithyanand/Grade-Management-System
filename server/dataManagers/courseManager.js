'use strict';
var jwt = require('jsonwebtoken');

var config = require('../config'),
    db = require('../services/database'),
    Course = require('../models/course');

var CourseController = {};

// Adding a course
CourseController.addCourse = function(req, res) {
        db.sync().then(function() {
            var newCourse = {
                courseName: req.body.cname,
            };
                console.log("New course!");
                console.log(newCourse);

            return Course.create(newCourse).then(function() {
                res.status(201).json({ message: 'New Course has been added!' });
            });
        }).catch(function(error) {
            res.status(403).json({ message: 'Request Failed!' });
        });
    }

// Getting all courses   
CourseController.getCourses = function(req, res) {

    //var potentialMatch = { where: { courseName: !null } };
         Course.findAll().then(function(courses) {
            if(!courses) {
                res.status(404).json({ message: 'Query failed!' });
            } 
            else { res.status(200).json(courses);
            }
        }).catch(function(error) {
            res.status(500).json({ message: 'There was an error!' });
        });
    }     

module.exports = CourseController;