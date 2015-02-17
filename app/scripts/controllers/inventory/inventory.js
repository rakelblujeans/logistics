'use strict';

function InventoryCtrl($http, $window, $route, $routeParams, $location, InventoryService, CommonCode) {

  this.orderBy = { 
    columnName: 'id',
    descending: false
  };

  this.data = {
    'current_order': undefined,
    'upcoming_orders': undefined
  };
  
  this.initFromData = function() {
    // get by inventory_id, not database record id
    this.invId = parseInt($routeParams.invIndex, 10);
    if (this.invId) { // detail view
      InventoryService.getItem(this.invId).then(function(item) {
        this.item = item;
        this.item.last_imaged_display = CommonCode.getFormattedDate(this.item.last_imaged);
        InventoryService.getCurrentOrder(this.invId).then(function(current_order) {
          if (current_order && current_order.length > 0) {
            this.data.current_order = current_order;
            this.data.current_order.arrival_date_display = CommonCode.getFormattedDate(this.data.current_order.arrival_date);
            this.data.current_order.departure_date_display = CommonCode.getFormattedDate(this.data.current_order.departure_date);
          }
        }.bind(this));

        InventoryService.getUpcomingOrders(this.invId).then(function(upcoming_orders) {
          this.data.upcoming_orders = upcoming_orders;
          for (var j=0; j<upcoming_orders.length; j++) {
            this.data.upcoming_orders[j].arrival_date_display = CommonCode.getFormattedDate(this.data.upcoming_orders[j].arrival_date);
            this.data.upcoming_orders[j].departure_date_display = CommonCode.getFormattedDate(this.data.upcoming_orders[j].departure_date);
          }
        }.bind(this));

      }.bind(this));

    } else { // list view

      InventoryService.getAll().then(function(data) {
        for (var i=0; i<data.length; i++) {
          if (data[i].last_imaged) {
            //console.log();
            data[i].last_imaged_display = CommonCode.getFormattedDate(data[i].last_imaged);
          }
        }
        this.inventory = data;
      }.bind(this));
    }

  };
  this.initFromData();

  this.togglePhoneActivation = function(item) {
    InventoryService.toggleActivation(item.id).then(function(phone){
      this.initFromData();
    }.bind(this));
  };
  
};

InventoryCtrl.$inject = ['$http', '$window', '$route', '$routeParams', '$location', 'InventoryService', 'CommonCode'];

angular.module('logisticsApp.controllers')
.controller('InventoryCtrl', InventoryCtrl);
