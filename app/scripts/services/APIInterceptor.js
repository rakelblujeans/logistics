'use strict';

angular.module('logisticsApp.services')
.service('APIInterceptor', function($rootScope, UserService) {
    var service = this;

    service.request = function(config) { 
        var currentUser = UserService.getCurrentUser(),
            accessToken = currentUser ? currentUser.accessToken : null;

        if (accessToken) {
            config.headers.authorization = accessToken;
        }
        return config;
    };

    service.responseError = function(response) {
        if (response.status === 401) {
            $rootScope.$broadcast('unauthorized');
        }
        return response;
    };
});