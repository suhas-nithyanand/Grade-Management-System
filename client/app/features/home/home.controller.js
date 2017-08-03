(function() {
    'use strict';

    angular
        .module('grade-management')
        .controller('GradeController', [
            '$http','gradesService','courseService','studentsService',
            GradeController
        ]);

    function GradeController($http,gradesService,courseService,studentsService) {
        var vm = this;
        vm.getStudentGradesByUsername = getStudentGradesByUsername;
        vm.grades = [];
        vm.message = "";
        vm.gErrorMessage = "";
        vm.username;
        vm.grades;
        vm.getCourses = getCourses;
        vm.courses = [];
        vm.gradesErrorFlag = true
        vm.showData = true;
        vm.showUserInfo = true;
        vm.studentInfo;

        getCourses();

        function getStudentGradesByUsername() {

        studentsService.getstudentInfo(vm.username)
                    .then(studenthandleSuccess)
                    .catch(handleFailed);

        gradesService.getGradesByUsername(vm.username)
        //console.log(vm.grades);
                .then(handleSuccess)
                .catch(handleFailed);
        }

        function handleSuccess(response) {         
            vm.grades = response.data;
            if (vm.grades.length > 0){
                vm.showData = false;
                vm.message = "Sucessfully obatined student records!";
                console.log(vm.showData,vm.grades);
            }
            else{
                getGradeshandleFailed();
            }
        }

        function getCourses() {
            console.log("entered courses function in gc");
            courseService.getCourses()
                .then(coursehandleSuccess)
                .catch(handleFailed);
        }

        function coursehandleSuccess(response) {         
            vm.courses = response.data;
            vm.message = "Success! Obtained Course List";
            console.log( vm.message,vm.courses);
        }


        function studenthandleSuccess(response) {
            vm.studentInfo = response.data;
            if (vm.studentInfo == null){
                handleFailed();
            }
            else{
            vm.showUserInfo = false;        
            vm.message = "Sucessfully obatined student records! ";
            console.log( vm.message,vm.studentInfo);
            }
        }

        function handleFailed(response) {
            vm.message = "Request Failed";
            console.log( vm.message);
            return vm.message;
            }
            
         function getGradeshandleFailed(response) {
            vm.gradesErrorFlag = false;
            vm.gErrorMessage = "Username is inavlid! Please enter a valid username!";
            console.log( vm.gErrorMessage);
            }
    }
})();
