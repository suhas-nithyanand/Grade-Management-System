(function() {
    'use strict';

    angular
        .module('grade-management')
        .factory('gradesService', [
            '$http',
            '$cookies',
            '$state',
            gradesService
        ]);
        
function gradesService($http, $cookies, $state) {

    console.log("gradesService");
    var gradesService = {
            getGradesByUsername: getGradesByUsername,
            addGrade: addGrade
        };

        return gradesService;

    function getGradesByUsername(username) {

           var reqObj = {
            method: 'POST',
            url: '/api/checkGrades',
            data: {
                username: username,
                }
           }
        return $http(reqObj);
    };

    function addGrade(username,course,grade) {

           var reqObj = {
            method: 'POST',
            url: '/api/grade',
            data: {
                userName: username,
                courseName: course,
                grade: grade
                }
           }
        return $http(reqObj);
    };

}
})();