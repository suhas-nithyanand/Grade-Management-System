(function() {
    'use strict';

    angular
        .module('grade-management')
        .controller('TeacherController', [
            '$http','gradesService','courseService','studentsService',
            TeacherController
        ]);

     function TeacherController($http,gradesService,courseService,studentsService) {
        var vm = this;

        vm.grades = [];
        vm.message = "";
        vm.username;
        vm.fname;
        vm.lanme;
        vm.grades;
        vm.courses = [];
        vm.showData = true;
        vm.showUserInfo = true;
        vm.studentInfo;
        vm.coursename;
        vm.addCourseFlag = true;
        vm.addStudentFlag = true;
        vm.addGradeFlag = true;
        vm.showCourse = 'Select Course';
        vm.showGrade = 'Select Grade';
        vm.grades = ['A','B','C','D','E']
        vm.gradesErrorFlag = true
        vm.gErrorMessage = "";

        //functions
        vm.getCourses = getCourses;
        vm.addCourse = addCourse;
        vm.addStudent = addStudent;
        vm.getStudentGradesByUsername = getStudentGradesByUsername;
        vm.selectCourse = selectCourse;
        vm.selectGrade = selectGrade;
        vm.addGrade = addGrade;

        getCourses();

        function getStudentGradesByUsername() {
            gradesService.getGradesByUsername(vm.username)
                .then(handleSuccess)
                .catch(handleFailed);
        }

        function addGrade() {
            gradesService.addGrade(vm.username,vm.showCourse,vm.showGrade)
                .then(addGradehandleSuccess)
                .catch(handleFailed);
        }

        function handleSuccess(response) {         
            vm.grades = response.data;
            if (vm.grades.length > 0){
                vm.showUserInfo = false;
                vm.showData = false;
                vm.message = "Sucessfully obatined student records!";
                console.log(vm.showData,vm.grades);
            }
            else{
                getGradeshandleFailed();
            }
        }

        function getCourses() {
            console.log("entered courses function in tc");
            courseService.getCourses()
                .then(coursehandleSuccess)
                .catch(handleFailed);
        }

        function addCourse() {
            console.log("add courses function in tc");
            courseService.addCourse(vm.coursename)
                .then(addCourseHandleSuccess)
                .catch(handleFailed);
        }

        function addStudent() {
            console.log("add student function in tc");
            studentsService.addStudent(vm.username,vm.fname,vm.lname)
                .then(addStudentHandleSuccess)
                .catch(handleFailed);
            }

        function selectCourse(courseName){
            console.log('courseName:',courseName);
            vm.showCourse = courseName;
        }

        function selectGrade(grade){
            console.log('grade:',grade);
            vm.showGrade = grade;
        }

        function addStudentHandleSuccess(response) {         
            vm.message = "Success!";
            vm.addStudentFlag = false;
        }

         function addGradehandleSuccess(response) {  
            vm.addGradeFlag = false;       
            vm.message = "Success!";
        }

        function addCourseHandleSuccess(response) {         
            vm.message = "Success!";
            vm.addCourseFlag = false;
        }

        function coursehandleSuccess(response) {         
            vm.courses = response.data;
            vm.message = "Success!";
            console.log( vm.message,vm.courses);
        }

        function handleFailed(response) {
            vm.message = "Request Failed";
            console.log( vm.message);
        } 

        function getGradeshandleFailed(response) {
            vm.gradesErrorFlag = false;
            vm.gErrorMessage = "Username is inavlid! Please enter a valid username!";
            console.log( vm.gErrorMessage);
            }

     }
})();