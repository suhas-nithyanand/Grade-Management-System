'use strict';
var jwt = require('jsonwebtoken');

var config = require('../config'),
    db = require('../services/database'),
    Student = require('../models/student');

var StudentController = {};

//Add a student
StudentController.addStudent = function(req, res) {
        db.sync().then(function() {
            var newStudent = {
                userName: req.body.username,
                lastName: req.body.lname,
                firstName: req.body.fname
            };

            return Student.create(newStudent).then(function() {
                res.status(201).json({ message: 'New Student has been added!' });
            });
        }).catch(function(error) {
            res.status(403).json({ message: 'Request Failed!' });
        });
    }
//Get all students
StudentController.getStudents = function(req, res) {
         Student.findAll().then(function(students) {
            if(!students) {
                res.status(404).json({ message: 'Query failed!' });
            } 
            else { res.status(200).json(students);
            }
        }).catch(function(error) {
            res.status(500).json({ message: 'There was an error!' });
        });
    }

//Get student info using Username
StudentController.getStudentDetails = function(req, res) {
   console.log("get student Details");
        db.sync().then(function() {
            var username = req.body.username,
                potentialMatch = { where: { userName: username } };

            return Student.findOne(potentialMatch).then(function(matchedStudent) {
                res.status(201).json(matchedStudent);
            });
        }).catch(function(error) {
            res.status(403).json({ message: 'Request Failed!' });
        });
 
    }


module.exports = StudentController;
