'use strict';

function ShipmentFormCtrl($route, $routeParams, $location, DataService) {

  this.form = { 'shipment': {} };
  this.header = 'New Shipment';

  this.initFromData = function() {
    this.shipmentId = parseInt($routeParams.shipmentIndex, 10);
    if (this.shipmentId) { // if editing
      DataService.getShipment(this.shipmentId).then(function(shipment) {
        this.form = { 'shipment': shipment };
        this.header = 'Update shipment #' + shipment.id;
      });
    }
  };
  this.initFromData;

  this.submitEdit = function() {
    DataService.updateShipment(this.shipmentId, this.form.shipment).then(function() {
      $location.path('shipments/' + this.shipmentId);
    });
    // TODO: add spinner until confirmed saved
  };

  this.submitNew = function() {
    DataService.createShipment(this.form.shipment).then(function(newData) {
      // TODO: handle errors
      $location.path('shipments/' + newData.id);
    });
  };
}

angular.module('logisticsApp.controllers')
.controller('ShipmentFormCtrl', ShipmentFormCtrl);
