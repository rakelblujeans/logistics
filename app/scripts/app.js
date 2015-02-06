'use strict';

angular.module('logisticsApp.filters', []);
angular.module('logisticsApp.services', []);
angular.module('logisticsApp.controllers', []);

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
    'logisticsApp.controllers'
  ])
  .config(['$routeProvider', 'DataServiceProvider', '$httpProvider', '$compileProvider',
    function ($routeProvider, DataServiceProvider, $httpProvider, $compileProvider) {
    $routeProvider
      .when('/', { templateUrl: 'views/home/index.html', controller: 'HomeCtrl' })

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
      
      /*.when('/customers/new/',            { templateUrl: 'views/customers/new.html', controller: 'CustomerFormCtrl', controllerAs: 'Customer' })
      .when('/customers/:custIndex',      { templateUrl: 'views/customers/detail.html', controller: 'CustomerCtrl', controllerAs: 'Customer' })
      .when('/customers/edit/:custIndex', { templateUrl: 'views/customers/edit.html', controller: 'CustomerFormCtrl', controllerAs: 'Customer' })
      .when('/customers',                 { templateUrl: 'views/customers/index.html', controller: 'CustomerCtrl', controllerAs: 'Customer' })

      .when('/creditCards/new',             { templateUrl: 'views/creditCards/new.html', controller: 'CreditCardFormCtrl', controllerAs: 'CreditCard' })
      .when('/creditCards/:cardIndex',      { templateUrl: 'views/creditCards/detail.html', controller: 'CreditCardCtrl', controllerAs: 'CreditCard' })
      .when('/creditCards/edit/:cardIndex', { templateUrl: 'views/creditCards/edit.html', controller: 'CreditCardFormCtrl', controllerAs: 'CreditCard' })
      .when('/creditCards',                 { templateUrl: 'views/creditCards/index.html', controller: 'CreditCardCtrl', controllerAs: 'CreditCard' })
      
      .when('/receipts/new',                 { templateUrl: 'views/receipts/new.html', controller: 'ReceiptFormCtrl', controllerAs: 'Receipt' })
      .when('/receipts/edit/:receiptIndex',  { templateUrl: 'views/receipts/edit.html', controller: 'ReceiptFormCtrl', controllerAs: 'Receipt' })
      .when('/receipts/:receiptIndex',       { templateUrl: 'views/receipts/detail.html', controller: 'ReceiptCtrl', controllerAs: 'Receipt' })
      .when('/receipts',                     { templateUrl: 'views/receipts/index.html', controller: 'ReceiptCtrl', controllerAs: 'Receipt' })
      */
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
      DataServiceProvider.localUrl = 'data/';
      DataServiceProvider.useRemote = true;
      DataServiceProvider.delivery_transit_time_sending = 3;
      DataServiceProvider.delivery_transit_time_return = 3;

      $httpProvider.defaults.headers.patch = {
        'Content-Type': 'application/json;charset=utf-8'
      };
      $httpProvider.defaults.headers.common = { 'Authorization': 'Basic ' + btoa('admin:secret') };
  }]);
