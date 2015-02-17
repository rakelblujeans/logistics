'use strict';

angular.module('logisticsApp.filters', []);
angular.module('logisticsApp.services', []);
angular.module('logisticsApp.controllers', []);
angular.module('logisticsApp.directives', []);

angular
  .module('logisticsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMessages',
    'logisticsApp.filters',
    'logisticsApp.services',
    'logisticsApp.controllers',
    'logisticsApp.directives'
  ])
  .config(['$routeProvider', 'DataServiceProvider', 'OrderServiceProvider', '$httpProvider', '$compileProvider',
    function ($routeProvider, DataServiceProvider, OrderServiceProvider, $httpProvider, $compileProvider) {
    $routeProvider
      .when('/', { templateUrl: 'views/home/index.html', controller: 'HomeCtrl', controllerAs: 'Home' })

      .when('/inventory/new/',               { templateUrl: 'views/inventory/new.html', controller: 'InventoryFormCtrl', controllerAs: 'Inventory' })
      .when('/inventory/:invIndex',          { templateUrl: 'views/inventory/detail.html', controller: 'InventoryCtrl', controllerAs: 'Inventory' })
      .when('/inventory/edit/:invIndex',     { templateUrl: 'views/inventory/edit.html', controller: 'InventoryFormCtrl', controllerAs: 'Inventory' })
      .when('/inventory',                    { templateUrl: 'views/inventory/index.html', controller: 'InventoryCtrl', controllerAs: 'Inventory' })

      .when('/orders/new/',       { templateUrl: 'views/orders/add.html', controller: 'OrderFormCtrl', controllerAs: 'Order' })
      .when('/orders/out/',       { templateUrl: 'views/orders/index.html', controller: 'OrderOutCtrl', controllerAs: 'Order' })
      .when('/orders/ship/:id',   { templateUrl: 'views/orders/ship.html', controller: 'ShipOrderCtrl', controllerAs: 'Order' })
      .when('/orders/:id',        { templateUrl: 'views/orders/detail.html', controller: 'OrderCtrl', controllerAs: 'Order' })
      .when('/orders/edit/:id',   { templateUrl: 'views/orders/edit.html', controller: 'OrderFormCtrl', controllerAs: 'Order' })
      .when('/orders',            { templateUrl: 'views/orders/index.html', controller: 'OrderCtrl', controllerAs: 'Order' })
      
      .when('/telcos/new',                  { templateUrl: 'views/telcos/new.html', controller: 'TelcoFormCtrl', controllerAs: 'Telco' })
      .when('/telcos/edit/:telcoIndex',     { templateUrl: 'views/telcos/edit.html', controller: 'TelcoFormCtrl', controllerAs: 'Telco' })
      .when('/telcos/:telcoIndex',          { templateUrl: 'views/telcos/detail.html', controller: 'TelcoCtrl', controllerAs: 'Telco' })
      .when('/telcos',                      { templateUrl: 'views/telcos/index.html', controller: 'TelcoCtrl', controllerAs: 'Telco' })

      .when('/shipments/new',                 { templateUrl: 'views/shipments/new.html', controller: 'ShipmentFormCtrl', controllerAs: 'Shipment' })
      .when('/shipments/edit/:shipmentIndex', { templateUrl: 'views/shipments/edit.html', controller: 'ShipmentFormCtrl', controllerAs: 'Shipment' })
      .when('/shipments/:shipmentIndex',      { templateUrl: 'views/shipments/detail.html', controller: 'ShipmentCtrl', controllerAs: 'Shipment' })
      .when('/shipments',                     { templateUrl: 'views/shipments/index.html', controller: 'ShipmentCtrl', controllerAs: 'Shipment' })
      
      .when('/calendar',                     { templateUrl: 'views/calendar/index.html', controller: 'CalendarCtrl', controllerAs: 'Calendar' })
      .when('/search',                       { templateUrl: 'views/home/search.html', controller: 'SearchCtrl', controllerAs: 'Search' })

      .otherwise({ redirectTo: '/' });

      $compileProvider.debugInfoEnabled(false);

      DataServiceProvider.remoteUrl = 'http://logisticsbackend.herokuapp.com/';
      DataServiceProvider.localUrl = 'http://localhost:3000/';
      DataServiceProvider.useRemote = false;
      OrderServiceProvider.deliveryTransitTimeSending = 3;
      OrderServiceProvider.deliveryTransitTimeReturn = 3;

      $httpProvider.useApplyAsync(true);
      $httpProvider.defaults.headers.patch = {
        'Content-Type': 'application/json;charset=utf-8'
      };
      //$httpProvider.interceptors.push('APIInterceptor');
      $httpProvider.defaults.headers.common = { 'Authorization': 'Basic ' + btoa('admin:secret') };
  }]);
