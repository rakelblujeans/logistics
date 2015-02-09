'use strict';

function ShipmentCtrl($http, $window, $route, $routeParams, DataService, CommonCode) {
    
  this.sort = CommonCode.sort;
  this.ascending = CommonCode.ascending;
  this.changeSorting = CommonCode.changeSorting;
  
  this.initFromData = function() {
    this.shipmentId = parseInt($routeParams.shipmentIndex, 10);
    if (this.shipmentId) { // detail view
      DataService.getShipment(this.shipmentId).then(function(shipment) {
        this.shipment = shipment;
      });
    } else { // list view
      DataService.getShipments().then(function(data) {
        this.shipments = data;
      });  
    }
   };
  this.initFromData();
}

angular.module('logisticsApp.controllers')
.controller('ShipmentCtrl', ShipmentCtrl);
