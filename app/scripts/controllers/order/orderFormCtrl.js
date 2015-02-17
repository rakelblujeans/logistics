'use strict';

function OrderFormCtrl($route, $routeParams, $location, OrderService) {

  this.form = { 'order': {} };
  this.header = 'New Order';

  this.initFromData = function() {
    this.orderId = $routeParams.id;
    if (this.orderId) { // if editing
      OrderService.get(this.orderId).then(function(order) {
        order.arrival_date = new Date(order.arrival_date)
        order.departure_date = new Date(order.departure_date)
        this.form = { 'order': order };
        this.header = 'Update order #' + order.id;
      }.bind(this));
    }
  };
  this.initFromData();

  this.submitEdit = function() {
    OrderService.update(this.orderId, this.form.order).then(function() {
      $location.path('orders/' + this.orderId);
    }.bind(this));
    // TODO: add spinner until confirmed saved
  };

  this.submitNew = function() {
    OrderService.create(this.form.order).then(function(newData) {
      // TODO: handle errors
      $location.path('orders/' + newData.id);
    });
  };

};

OrderFormCtrl.$inject = ['$route', '$routeParams', '$location', 'OrderService'];

angular.module('logisticsApp.controllers')
.controller('OrderFormCtrl', OrderFormCtrl);
