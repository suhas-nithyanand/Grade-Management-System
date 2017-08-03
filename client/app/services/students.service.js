(function() {
    'use strict';

    angular
        .module('grade-management')
        .factory('studentsService', [
            '$http',
            '$cookies',
            '$state',
            studentsService
        ]);

function studentsService($http, $cookies, $state) {

    console.log("studentsService");
    var studentsService = {
            getStudents: getStudents,
            getstudentInfo: getstudentInfo,
            addStudent: addStudent
        };

        return studentsService;

    function getStudents() {
        var urlBase = '/api/students';
        var studentsService = {};

        studentsService.getStudents = function () {
            return $http.get(urlBase);
        };
    }

    function getstudentInfo(username){
        var reqObj = {
            method: 'POST',
            url: '/api/studentInfo',
            data: {
                username: username,
            }
        }
             return $http(reqObj);
    }

    function addStudent(username,firstname,lastname){
        var reqObj = {
            method: 'POST',
            url: '/api/student',
            data: {
                username: username,
                fname: firstname,
                lname:lastname
            }
        }
             return $http(reqObj);
    }
}
})();