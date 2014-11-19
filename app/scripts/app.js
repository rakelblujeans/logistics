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
  .config(['$routeProvider', 'DataServiceProvider', '$httpProvider',
    function ($routeProvider, DataServiceProvider, $httpProvider) {
    $routeProvider
      .when('/', { templateUrl: 'views/home.html', controller: 'HomeCtrl' })

      .when('/inventory/new/',            { templateUrl: 'views/inventory/new.html', controller: 'InventoryFormCtrl' })
      .when('/inventory/:invIndex',       { templateUrl: 'views/inventory/detail.html', controller: 'InventoryDetailCtrl' })
      .when('/inventory/edit/:invIndex',  { templateUrl: 'views/inventory/edit.html', controller: 'InventoryFormCtrl' })
      .when('/inventory',                 { templateUrl: 'views/inventory/index.html', controller: 'InventoryCtrl' })

      .when('/orders/new/',               { templateUrl: 'views/orders/new.html', controller: 'OrderFormCtrl' })      
      .when('/orders/:orderIndex',        { templateUrl: 'views/orders/detail.html', controller: 'OrderDetailCtrl' })
      .when('/orders/edit/:orderIndex',   { templateUrl: 'views/orders/edit.html', controller: 'OrderFormCtrl' })
      .when('/orders',                    { templateUrl: 'views/orders/index.html', controller: 'OrderCtrl' })
      
      .when('/customers/new/',            { templateUrl: 'views/customers/new.html', controller: 'CustomerFormCtrl' })
      .when('/customers/:custIndex',      { templateUrl: 'views/customers/detail.html', controller: 'CustomerDetailCtrl' })
      .when('/customers/edit/:custIndex', { templateUrl: 'views/customers/edit.html', controller: 'CustomerFormCtrl' })
      .when('/customers',                 { templateUrl: 'views/customers/index.html', controller: 'CustomerCtrl' })

      .when('/creditCards/new',             { templateUrl: 'views/creditCards/new.html', controller: 'CreditCardFormCtrl' })
      .when('/creditCards/:cardIndex',      { templateUrl: 'views/creditCards/detail.html', controller: 'CreditCardCtrl' })
      .when('/creditCards/edit/:cardIndex', { templateUrl: 'views/creditCards/edit.html', controller: 'CreditCardFormCtrl' })
      .when('/creditCards',                 { templateUrl: 'views/creditCards/index.html', controller: 'CreditCardCtrl' })
      
      .when('/telcos',    { templateUrl: 'views/telcos.html', controller: 'TelcoCtrl' })
      
      .otherwise({ redirectTo: '/' });

      DataServiceProvider.remoteUrl = 'http://localhost:3000/';
      DataServiceProvider.localUrl = 'data/';
      DataServiceProvider.useRemote = true;

      $httpProvider.defaults.headers.patch = {
        'Content-Type': 'application/json;charset=utf-8'
      };

  }]);
