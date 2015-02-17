'use strict';

function ShipmentCtrl($http, $window, $route, $routeParams, ShipmentService) {
    
  this.orderBy = { 
    columnName: 'id',
    descending: false
  };

  this.shipment = {};
  this.shipments = [];
  
  this.initFromData = function() {
    this.shipmentId = parseInt($routeParams.shipmentIndex, 10);
    if (this.shipmentId) { // detail view
      ShipmentService.get(this.shipmentId).then(function(shipment) {
        this.shipment = shipment;
      }.bind(this));
    } else { // list view
      ShipmentService.getAll().then(function(data) {
        this.shipments = data;
      }.bind(this));
    }
   };
  this.initFromData();
}

ShipmentCtrl.$inject = ['$http', '$window', '$route', '$routeParams', 'ShipmentService'];

angular.module('logisticsApp.controllers')
.controller('ShipmentCtrl', ShipmentCtrl);