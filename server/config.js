// Application configuration.
'use strict';

var config = module.exports;

config.db = {
    user: 'root', 
    password: 'suhas1991',
    name: 'student_records'
};

config.db.details = {
    host: 'localhost',
    port: 3306,      
    dialect: 'mysql'
};

config.keys = {
    secret: '/jVdfUX+u/Kn3qPY4+ahjwQgyV5UhkM5cdh1i2xhozE=' // Not anymore...
};

var userRoles = config.userRoles = {
    teacher: 1,    // ...001
    student: 2,     // ...010
    admin: 4     // ...100
};

config.accessLevels = {
    guest: userRoles.teacher | userRoles.student | userRoles.admin,    // ...111
    teacher: userRoles.teacher | userRoles.admin,                       // ...101
    admin: userRoles.admin                                        // ...100
};