'use strict';

function ShipmentCtrl($scope, $http, $window, $route, $routeParams, DataService) {
    
  ListCtrl.call(this, $scope, DataService);
  
  $scope.initFromData = function() {
    $scope.shipmentId = parseInt($routeParams.shipmentIndex, 10);
    if ($scope.shipmentId) { // detail view
      DataService.getShipment($scope.shipmentId).then(function(shipment) {
        $scope.shipment = shipment;
      });
    } else { // list view
      DataService.getShipments().then(function(data) {
        $scope.shipments = data;
      });  
    }
   };
  $scope.$on('$viewContentLoaded', $scope.initFromData);
}

ShipmentCtrl.prototype = Object.create(ListCtrl.prototype);

angular.module('logisticsApp.controllers')
.controller('ShipmentCtrl', ShipmentCtrl);
