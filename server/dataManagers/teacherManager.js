'use strict';

// The teacher controller.
var TeacherController = {
    index: function(req, res) {
        res.status(200).json({ message: 'Welcome to the teachers area ' + req.user.firstName + ' ' + req.user.lastName +'!' });
    }
};

module.exports = TeacherController;