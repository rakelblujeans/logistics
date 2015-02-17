'use strict';

function ShipmentFormCtrl($route, $routeParams, $location, ShipmentService) {

  this.form = { 'shipment': {} };
  this.header = 'New Shipment';

  this.initFromData = function() {
    this.shipmentId = parseInt($routeParams.shipmentIndex, 10);
    if (this.shipmentId) { // if editing
      ShipmentService.get(this.shipmentId).then(function(shipment) {
        this.form = { 'shipment': shipment };
        this.header = 'Update shipment #' + shipment.id;
      });
    }
  };
  this.initFromData;

  this.submitEdit = function() {
    ShipmentService.update(this.shipmentId, this.form.shipment).then(function() {
      $location.path('shipments/' + this.shipmentId);
    });
    // TODO: add spinner until confirmed saved
  };

  this.submitNew = function() {
    ShipmentService.create(this.form.shipment).then(function(newData) {
      // TODO: handle errors
      $location.path('shipments/' + newData.id);
    });
  };
}

ShipmentFormCtrl.$inject = ['$route', '$routeParams', '$location', 'ShipmentService'];

angular.module('logisticsApp.controllers')
.controller('ShipmentFormCtrl', ShipmentFormCtrl);