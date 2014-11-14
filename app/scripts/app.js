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
      .when('/orders', {
        templateUrl: 'views/orders/index.html',
        controller: 'OrderCtrl'
      })
      .when('/orders', {
        templateUrl: 'views/orders/detail.html',
        controller: 'OrderDetailCtrl'
      })
      .when('/orders', {
        templateUrl: 'views/orders/edit.html',
        controller: 'OrderFormCtrl'
      })
      .when('/customers', {
        templateUrl: 'views/customers/index.html',
        controller: 'CustomerCtrl'
      })
      .when('/customers/:custIndex', {
        templateUrl: 'views/customers/detail.html',
        controller: 'CustomerDetailCtrl'
      })
      .when('/telcos', {
        templateUrl: 'views/telcos.html',
        controller: 'TelcoCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

      DataServiceProvider.remoteUrl = 'http://localhost:3000/';
      DataServiceProvider.localUrl = 'data/';
      DataServiceProvider.useRemote = true;
  }]);
