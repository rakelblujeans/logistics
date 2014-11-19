'use strict';

function ShipmentCtrl($scope, $http, $window, $route, $routeParams, DataService) {
    
  ListCtrl.call(this, $scope);
  
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

ShipmentCtrl.prototype.toggleActivation = function(index) {
  DataService.setActive('shipments', $scope.shipments[index].id, 
    !$scope.shipments[index].active).then(function(success){
    if (success) {
      $scope.shipments[index].active = !$scope.shipments[index].active;
    }
  });
};

angular.module('logisticsApp.controllers')
.controller('ShipmentCtrl', ShipmentCtrl);
