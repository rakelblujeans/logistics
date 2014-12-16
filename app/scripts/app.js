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
      .when('/', { templateUrl: 'views/home/index.html', controller: 'HomeCtrl' })

      .when('/inventory/new/',            { templateUrl: 'views/inventory/new.html', controller: 'InventoryFormCtrl', controllerAs: 'Inventory' })
      .when('/inventory/:invIndex',       { templateUrl: 'views/inventory/detail.html', controller: 'InventoryCtrl', controllerAs: 'Inventory' })
      .when('/inventory/edit/:invIndex',  { templateUrl: 'views/inventory/edit.html', controller: 'InventoryFormCtrl', controllerAs: 'Inventory' })
      .when('/inventory',                 { templateUrl: 'views/inventory/index.html', controller: 'InventoryCtrl', controllerAs: 'Inventory' })

      .when('/orders/new/',               { templateUrl: 'views/orders/new.html', controller: 'OrderFormCtrl', controllerAs: 'Order' })
      .when('/orders/ship/:id',           { templateUrl: 'views/orders/ship.html', controller: 'ShipOrderCtrl', controllerAs: 'Order' })
      //.when('/orders/:verifiedState/',         { templateUrl: 'views/orders/unverified.html', controller: 'OrderCtrl', controllerAs: 'Order' })
      //.when('/orders/:verified/',         { templateUrl: 'views/orders/unshipped.html', controller: 'OrderCtrl', controllerAs: 'Order' })
      .when('/orders/:id',        { templateUrl: 'views/orders/detail.html', controller: 'OrderCtrl', controllerAs: 'Order' })
      .when('/orders/edit/:id',   { templateUrl: 'views/orders/edit.html', controller: 'OrderFormCtrl', controllerAs: 'Order' })
      .when('/orders',                    { templateUrl: 'views/orders/index.html', controller: 'OrderCtrl', controllerAs: 'Order' })
      
      .when('/customers/new/',            { templateUrl: 'views/customers/new.html', controller: 'CustomerFormCtrl', controllerAs: 'Customer' })
      .when('/customers/:custIndex',      { templateUrl: 'views/customers/detail.html', controller: 'CustomerCtrl', controllerAs: 'Customer' })
      .when('/customers/edit/:custIndex', { templateUrl: 'views/customers/edit.html', controller: 'CustomerFormCtrl', controllerAs: 'Customer' })
      .when('/customers',                 { templateUrl: 'views/customers/index.html', controller: 'CustomerCtrl', controllerAs: 'Customer' })

      .when('/creditCards/new',             { templateUrl: 'views/creditCards/new.html', controller: 'CreditCardFormCtrl', controllerAs: 'CreditCard' })
      .when('/creditCards/:cardIndex',      { templateUrl: 'views/creditCards/detail.html', controller: 'CreditCardCtrl', controllerAs: 'CreditCard' })
      .when('/creditCards/edit/:cardIndex', { templateUrl: 'views/creditCards/edit.html', controller: 'CreditCardFormCtrl', controllerAs: 'CreditCard' })
      .when('/creditCards',                 { templateUrl: 'views/creditCards/index.html', controller: 'CreditCardCtrl', controllerAs: 'CreditCard' })
      
      .when('/telcos/new',                  { templateUrl: 'views/telcos/new.html', controller: 'TelcoFormCtrl', controllerAs: 'Telco' })
      .when('/telcos/edit/:telcoIndex',     { templateUrl: 'views/telcos/edit.html', controller: 'TelcoFormCtrl', controllerAs: 'Telco' })
      .when('/telcos/:telcoIndex',          { templateUrl: 'views/telcos/detail.html', controller: 'TelcoCtrl', controllerAs: 'Telco' })
      .when('/telcos',                      { templateUrl: 'views/telcos/index.html', controller: 'TelcoCtrl', controllerAs: 'Telco' })

      .when('/shipments/new',                 { templateUrl: 'views/shipments/new.html', controller: 'ShipmentFormCtrl', controllerAs: 'Shipment' })
      .when('/shipments/edit/:shipmentIndex', { templateUrl: 'views/shipments/edit.html', controller: 'ShipmentFormCtrl', controllerAs: 'Shipment' })
      .when('/shipments/:shipmentIndex',      { templateUrl: 'views/shipments/detail.html', controller: 'ShipmentCtrl', controllerAs: 'Shipment' })
      .when('/shipments',                     { templateUrl: 'views/shipments/index.html', controller: 'ShipmentCtrl', controllerAs: 'Shipment' })

      .when('/receipts/new',                 { templateUrl: 'views/receipts/new.html', controller: 'ReceiptFormCtrl', controllerAs: 'Receipt' })
      .when('/receipts/edit/:receiptIndex',  { templateUrl: 'views/receipts/edit.html', controller: 'ReceiptFormCtrl', controllerAs: 'Receipt' })
      .when('/receipts/:receiptIndex',       { templateUrl: 'views/receipts/detail.html', controller: 'ReceiptCtrl', controllerAs: 'Receipt' })
      .when('/receipts',                     { templateUrl: 'views/receipts/index.html', controller: 'ReceiptCtrl', controllerAs: 'Receipt' })

      .when('/calendar',                     { templateUrl: 'views/calendar/index.html', controller: 'CalendarCtrl', controllerAs: 'Calendar' })
      
      .otherwise({ redirectTo: '/' });

      DataServiceProvider.remoteUrl = 'http://localhost:3000/';
      DataServiceProvider.localUrl = 'data/';
      DataServiceProvider.useRemote = true;

      $httpProvider.defaults.headers.patch = {
        'Content-Type': 'application/json;charset=utf-8'
      };

  }]);
