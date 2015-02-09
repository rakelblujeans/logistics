 'use strict';

function OrderOutCtrl($route, $routeParams, DataService, $timeout, CommonCode) {

  this.sort = CommonCode.sort;
  this.ascending = CommonCode.ascending;
  this.changeSorting = CommonCode.changeSorting;
  this.getFormattedDate = CommonCode.getFormattedDate;

  this.data = {};
  
  function buildPhoneIdString(order) {
    var assignedPhones = [];
    for(var i=0; i<order.phones.length; i++) {
      if (order.phones[i]) {
        // always display by human-readable "inventory_id", not database id
        assignedPhones[assignedPhones.length] = order.phones[i].inventory_id;
      }
    }
    return "[" + assignedPhones.join(",") + "]"
  };

  this.initFromData = function() {
    this.sort.column = 'inventory_id'

    var thisCopy = this;
    DataService.getOrdersOut().then(function(data) {
      thisCopy.orders = data;
    });
    this.orders = thisCopy.orders;
  };
  this.initFromData();

};

angular.module('logisticsApp.controllers')
  .controller('OrderOutCtrl', OrderOutCtrl);