 'use strict';

function OrderCtrl($route, $routeParams, OrderService, $timeout, CommonCode) {
  /* Each order is going to have a data block associated with it. Data model will look
   * something like:
   * 
   * scope.orders = [{order}, {order}, ...] // <- from back end data
   * scope.data = [{order data}, {order data}, ...] <-- holds front end generated data
   *
   * Each order's data will look like:
   * scope.data = {
   *   order_id: {
   *     assignmentOptionsVisible: false,
   *     slotsAvailable: X,
   *     phoneSlots: [{phone}, {phone}, ...],
   *     assignedPhoneId: Y, ...
   * }}
   * 
   */

  this.orderBy = { 
    columnName: 'arrival_date',
    descending: false
  };
  this.data = {};
  this.options = {}; // holds routeParam options
  this.pullDataFn = OrderService.getAll;
  //this.order = undefined;

  this.setPageTitle = function(options) {
    if (options.unverified) {
      this.data.pageTitle = "Pending orders";
    } else if (options.unshipped) {
      this.data.pageTitle = "Orders ready for delivery"
    } else {
      this.data.pageTitle = "All Orders";
    }
  };

  this.initFromData = function() {

    if ($routeParams.verifiedState) {
      this.options = {
        unverified: $routeParams.verifiedState == false,
        unshipped: $routeParams.verifiedState == true};
    }

    this.setPageTitle(this.options);
    var orderId = $routeParams.id;

    if (orderId) { // detail view
      OrderService.get(orderId).then(function(order) {
        this.order = order;
        this.order.arrival_date_display = CommonCode.getFormattedDate(this.order.arrival_date);
        this.order.departure_date_display = CommonCode.getFormattedDate(this.order.departure_date);
        for (var i=0; i<this.order.phones.length; i++) {
          this.order.phones[i].last_imaged_display = CommonCode.getFormattedDate(this.order.phones[i].last_imaged)
        } 
        for (var z=0; z<this.order.shipments.length; z++) {
          this.order.shipments[z].out_on_date_display = CommonCode.getFormattedDate(this.order.shipments[z].out_on_date);
        }

        this.data[order.id] = {};
        CommonCode.getAvailableInventory(this.order, this.data[order.id]);
      }.bind(this));
    }
  };
  this.initFromData();
};

OrderCtrl.$inject = ['$route', '$routeParams', 'OrderService', '$timeout', 'CommonCode'];

angular.module('logisticsApp.controllers')
  .controller('OrderCtrl', OrderCtrl);