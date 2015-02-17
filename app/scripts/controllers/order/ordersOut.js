 'use strict';

function OrderOutCtrl($route, $routeParams, $timeout, OrderService) {

  this.orderBy = { 
    columnName: 'arrival_date',
    descending: false
  };

  this.data = [];
  this.pullDataFn = OrderService.getCurrentlyOut;
};

OrderOutCtrl.$inject = ['$route', '$routeParams', '$timeout', 'OrderService'];

angular.module('logisticsApp.controllers')
  .controller('OrderOutCtrl', OrderOutCtrl);