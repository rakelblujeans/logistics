'use strict';

function OrderFormCtrl($route, $routeParams, $location, DataService) {

  this.form = { 'order': {} };
  this.header = 'New Order';

  this.initFromData = function() {
    this.orderId = $routeParams.id;
    if (this.orderId) { // if editing
      var thisCopy = this;
      DataService.getOrder(this.orderId).then(function(order) {
        order.arrival_date = new Date(order.arrival_date)
        order.departure_date = new Date(order.departure_date)
        thisCopy.form = { 'order': order };
        thisCopy.header = 'Update order #' + order.id;
      });
      this.form = thisCopy.form;
      this.header = thisCopy.header;
    }
  };
  this.initFromData();

  this.submitEdit = function() {
    var thisCopy = this;
    DataService.updateOrder(this.orderId, this.form.order).then(function() {
      $location.path('orders/' + thisCopy.orderId);
    });
    // TODO: add spinner until confirmed saved
  };

  this.submitNew = function() {
    DataService.createOrder(this.form.order).then(function(newData) {
      // TODO: handle errors
      $location.path('orders/' + newData.id);
    });
  };

};

angular.module('logisticsApp.controllers')
.controller('OrderFormCtrl', OrderFormCtrl);
