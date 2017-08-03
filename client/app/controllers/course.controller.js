(function() {
    'use strict';

    angular
        .module('grade-management')
        .controller('CourseController', [
            '$http','courseService',
            CourseController
        ]);

    function CourseController($http,courseService) {
        var vm = this;
        vm.getCourses = getCourses;
        vm.courses = [];
        vm.message = "";

    function getCourses() {

        console.log("courses");
        courseService.getcourses()
                .then(handleSuccess)
                .catch(handleFailed);
        }

        function handleSuccess(response) {         
            vm.courses = response.data;
            vm.message = "Success!";
            console.log(vm.courses);
        }

        function handleFailed(response) {
            vm.message = "Request Failed";
            }
    }
})();