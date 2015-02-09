'use strict';

function InventoryCtrl($http, $window, $route, $routeParams, $location, DataService, CommonCode) {

  this.sort = CommonCode.sort;
  this.ascending = CommonCode.ascending;
  this.changeSorting = CommonCode.changeSorting;

  this.data = {
    'current_order': undefined,
    'upcoming_orders': undefined
  };
  
  this.initFromData = function() {
    // get by inventory_id, not database record id
    this.invId = parseInt($routeParams.invIndex, 10);
    if (this.invId) { // detail view
      var thisCopy = this;
      DataService.getItem(this.invId).then(function(item) {
        thisCopy.item = item;
        thisCopy.item.last_imaged_display = CommonCode.getFormattedDate(thisCopy.item.last_imaged);
        DataService.getCurrentOrder(thisCopy.invId).then(function(current_order) {
          if (current_order && current_order.length > 0) {
            thisCopy.data.current_order = current_order;
            thisCopy.data.current_order.arrival_date_display = CommonCode.getFormattedDate(thisCopy.data.current_order.arrival_date);
            thisCopy.data.current_order.departure_date_display = CommonCode.getFormattedDate(thisCopy.data.current_order.departure_date);
          }
        });

        DataService.getUpcomingOrders(thisCopy.invId).then(function(upcoming_orders) {
          thisCopy.data.upcoming_orders = upcoming_orders;
          for (var j=0; j<upcoming_orders.length; j++) {
            thisCopy.data.upcoming_orders[j].arrival_date_display = CommonCode.getFormattedDate(thisCopy.data.upcoming_orders[j].arrival_date);
            thisCopy.data.upcoming_orders[j].departure_date_display = CommonCode.getFormattedDate(thisCopy.data.upcoming_orders[j].departure_date);
          }
        });

      });
      this.data = thisCopy.data;
      this.item = thisCopy.item;

    } else { // list view

      var thisCopy = this;
      DataService.getInventory().then(function(data) {
        for (var i=0; i<data.length; i++) {
          if (data[i].last_imaged) {
            //console.log();
            data[i].last_imaged_display = CommonCode.getFormattedDate(data[i].last_imaged);
          }
        }
        thisCopy.inventory = data;
      });
      this.inventory = thisCopy.inventory;
    }

  };
  this.initFromData();

  this.togglePhoneActivation = function(item) {
    var thisCopy = this;
    DataService.togglePhoneActivation(item.id).then(function(phone){
      thisCopy.initFromData();
    });
  };
  
};

angular.module('logisticsApp.controllers')
.controller('InventoryCtrl', InventoryCtrl);
