'use strict';

function ShipmentFormCtrl($scope, $route, $routeParams, $location, DataService) {

  $scope.form = { 'shipment': {} };
  $scope.header = 'New Shipment';

  $scope.initFromData = function() {
    $scope.shipmentId = parseInt($routeParams.shipmentIndex, 10);
    if ($scope.shipmentId) { // if editing
      DataService.getShipment($scope.shipmentId).then(function(shipment) {
        $scope.form = { 'shipment': shipment };
        $scope.header = 'Update shipment #' + shipment.id;
      });
    }
  };
  $scope.$on('$viewContentLoaded', $scope.initFromData);

  $scope.submitEdit = function() {
    DataService.updateShipment($scope.shipmentId, $scope.form.shipment).then(function() {
      $location.path('shipments/' + $scope.shipmentId);
    });
    // TODO: add spinner until confirmed saved
  };

  $scope.submitNew = function() {
    DataService.createShipment($scope.form.shipment).then(function(newData) {
      // TODO: handle errors
      $location.path('shipments/' + newData.id);
    });
  };
}

angular.module('logisticsApp.controllers')
.controller('ShipmentFormCtrl', ShipmentFormCtrl);
