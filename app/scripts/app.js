'use strict';

angular.module('logisticsApp.services', []);
angular.module('logisticsApp.controllers', []);

angular
  .module('logisticsApp', [
    'sprintf',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'logisticsApp.services',
    'logisticsApp.controllers'
  ])
  .config(['$routeProvider', 'DataServiceProvider',
    function ($routeProvider, DataServiceProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/inventory', {
        templateUrl: 'views/inventory.html',
        controller: 'InventoryCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

      DataServiceProvider.remoteUrl = 'http://localhost:3000/%s.json';
      DataServiceProvider.localUrl = 'data/';
      DataServiceProvider.useRemote = false;
  }]);
