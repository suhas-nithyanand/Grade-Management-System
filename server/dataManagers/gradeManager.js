'use strict';
var jwt = require('jsonwebtoken');

var config = require('../config'),
    db = require('../services/database'),
    Grade = require('../models/grade');

var GradeController = {};

// Adding grade to a student
GradeController.addGrade = function(req, res) {
        db.sync().then(function() {
            var newGrade = {
                studentUsername: req.body.userName,
                courseName: req.body.courseName,
                grade: req.body.grade,
            };

            return Grade.create(newGrade).then(function() {
                res.status(201).json({ message: 'New Grade has been added!' });
            });
        }).catch(function(error) {
            res.status(403).json({ message: 'Request Failed!' });
        });
    }

//get grades based on Student ID using GET Request
GradeController.getStudentGrades = function(req, res) {
        db.sync().then(function() {
            var studentId = req.query.studentId,
                potentialMatch = { where: { studentId: studentId } };
            return Grade.findAll(potentialMatch).then(function(Grades) {
                res.status(201).json(Grades);
            });
        }).catch(function(error) {
            res.status(403).json({ message: 'Request Failed!' });
        });
    }

//get grades based on Student Username using POST Request
GradeController.checkGradesByUsername = function(req, res) {
        console.log("get student grades by username");
        db.sync().then(function() {
            var username = req.body.username,
                potentialMatch = { where: { studentUsername: username } };

            return Grade.findAll(potentialMatch).then(function(Grades) {
                res.status(201).json(Grades);
            });
        }).catch(function(error) {
            res.status(403).json({ message: 'Request Failed!' });
        });
 
    }

module.exports = GradeController;