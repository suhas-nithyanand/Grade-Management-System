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

        studentUsername: {
            type: Sequelize.STRING,
            allowNull: false
        },

        courseName: {
            type: Sequelize.STRING,
            allowNull: false
        },

        grade: {
            type: Sequelize.STRING,
            allowNull: false
        }
    };

var modelOptions = {};

var GradeModel = db.define('grade', modelDefinition,modelOptions);

module.exports = GradeModel;