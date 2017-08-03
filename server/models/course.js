'use strict';

var Sequelize = require('sequelize');
var config = require('../config'),
    db = require('../services/database');

var modelDefinition = {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        courseName: {
            type: Sequelize.STRING,
            allowNull: false
        }
    };


var modelOptions = {};

var CourseModel = db.define('course', modelDefinition,modelOptions);

module.exports = CourseModel;