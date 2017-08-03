(function() {
    'use strict';

    angular
        .module('grade-management')
        .factory('courseService', [
            '$http',
            '$cookies',
            '$state',
            courseService
        ]);
        
function courseService($http, $cookies, $state) {

    console.log("entered courseService");
    var courseService = {
            getCourses: getCourses,
            addCourse: addCourse
        };

        return courseService;

    function getCourses() {
        var reqObj = {
            method: 'GET',
            url: '/api/course'
            };
        
            return $http(reqObj);     
    }; 

    function addCourse(coursename) {
    var reqObj = {
        method: 'POST',
        url: '/api/course',
         data: {
                cname: coursename,
            }
        };

        return $http(reqObj);
    };
}
})();