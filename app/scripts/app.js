'use strict';

angular.module('logisticsApp.filters', []);
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
    'ngMessages',
    'logisticsApp.filters',
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
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/inventory', {
        templateUrl: 'views/inventory/index.html',
        controller: 'InventoryCtrl'
      })
      .when('/inventory/:invIndex', {
        templateUrl: 'views/inventory/detail.html',
        controller: 'InventoryDetailCtrl'
      })
      .when('/inventory/edit/:invIndex', {
        templateUrl: 'views/inventory/edit.html',
        controller: 'InventoryFormCtrl'
      })
      .when('/customers', {
        templateUrl: 'views/customers.html',
        controller: 'CustomerCtrl'
      })
      .when('/telcos', {
        templateUrl: 'views/telcos.html',
        controller: 'TelcoCtrl'
      })
      .when('/orders', {
        templateUrl: 'views/orders.html',
        controller: 'OrderCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

      DataServiceProvider.remoteUrl = 'http://localhost:3000/';
      DataServiceProvider.localUrl = 'data/';
      DataServiceProvider.useRemote = true;
  }]);
