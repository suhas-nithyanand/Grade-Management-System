(function() {
    'use strict';

    angular
        .module('grade-management')
        .controller('NavController', [
            'authService',
            navController
        ]);

    function navController(authService) {
        var vm = this;

        vm.isAuthenticated = authService.isAuthenticated;
        vm.logout = authService.logout;
    }

})();