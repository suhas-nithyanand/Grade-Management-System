(function () {
    'use strict';

    var app = angular.module('grade-management', [
        'ui.router',
        'ngCookies'
    ]);

    // API Request Interceptor
    app.factory('requestInterceptor', [
        '$cookies',
        function ($cookies) {
            return {
                request: function (config) {
                    var user = $cookies.get('user'),
                        token = null;

                    if (user) {
                        user = JSON.parse(user);
                        token = user.token ? user.token : null;
                    }

                    if (token) {
                        config.headers = config.headers || {};
                        config.headers.Authorization = token;
                    }

                    return config;
                }
            };
        }
    ]);

    // Static data constant.
    var staticData = {};

    var userRoles = staticData.userRoles = {
        teacher: 1,  // ...001
        student: 2,  // ...010
        admin: 4     // ...100
    };

    staticData.accessLevels = {
        guest: userRoles.teacher | userRoles.student | userRoles.admin,    // ...111
        teacher: userRoles.teacher | userRoles.admin,                       // ...101
        admin: userRoles.admin                                        // ...100
    };

    app.constant('staticData', staticData);

    // Config block.
    app.config([
        '$stateProvider',
        '$urlRouterProvider',
        '$httpProvider',
        '$locationProvider',
        'staticData',
        authConfig
    ]);

    function authConfig(
        $stateProvider,
        $urlRouterProvider,
        $httpProvider,
        $locationProvider,
        staticData) {

        // Index route.
        $stateProvider.state('index', {
            url: '/',
            templateUrl: 'app/features/home/home.html',
            controller: 'GradeController as gc'
        });

        // Login route.
        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'app/features/login/login.html',
            controller: 'LoginController as lc'
        });

        // teacher area route.
        $stateProvider.state('teacher', {
            url: '/teacher',
            templateUrl: 'app/features/teacher/teacher.html',
            controller: 'TeacherController as tc',
            data: {
                accessLevel: staticData.accessLevels.teacher
            }
        });

        // Signup route.
        $stateProvider.state('signup', {
            url: '/signup',
            templateUrl: 'app/features/signup/signup.html',
            controller: 'SignupController as sc'
        });

        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('requestInterceptor');
    }

    app.run([
        '$rootScope',
        '$state',
        'authService',
        authRun
    ]);

    function authRun($rootScope, $state, authService) {
        $rootScope.$on('$stateChangeStart', function (event, toState) {
            if (toState.data && toState.data.accessLevel) {
                var user = authService.getUserData();
                console.log(user,toState.data.accessLevel, user.role);
                if (!(toState.data.accessLevel & user.role)) {
                    event.preventDefault();
                    $state.go('index');
                    return;
                }
            }
        });
    }
})();