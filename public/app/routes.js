angular.module('userRoutes', ['ngRoute'])

.config(function ($routeProvider, $locationProvider) {
    $routeProvider

        .when('/docmate', {
            templateUrl : '/app/views/docmate.html',
            controller : 'docmateCtrl',
            controllerAs : 'docmate'
        })

        .otherwise( { redirectTo : '/'});

        $locationProvider.html5Mode({
            enabled : true,
            requireBase : false
        })
});
