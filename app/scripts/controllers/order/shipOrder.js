'use strict';

function ShipOrderCtrl($scope, $route, $routeParams, DataService, $timeout) {

  /*

  NOTES:
  slotsAvailable
  phoneSlots
  order.assignedPhoneId

  */

  $scope.initFromData = function() {
    
    $scope.orderId = parseInt($routeParams.id, 10);
    $scope.form = { 'shipment': {} };
    $scope.phoneSlots = {};
    $scope.slotsAvailable = 0;

    if ($scope.orderId) { // detail view
      DataService.getOrder($scope.orderId).then(function(order) {
        $scope.order = order;
        // pull latest inventory
        //console.log('pull inventory', order.assignSelectIsVisible);
        self._updateState();
      });
    }
  };
  $scope.$on('$viewContentLoaded', $scope.initFromData);

  self._updateState = function() {

    $scope.slotsAvailable = 0;
    DataService.checkInventoryState($scope.order).then(function(data) {
      $scope.order.availableInventory = data.availableInventory;
      //console.log($scope.order.availableInventory);
      $scope.phoneSlots = data.assignedInventory;
      //console.log("phoneSlots", $scope.phoneSlots);

      for (var i=0; i<$scope.order.num_phones; i++) {
        if ($scope.phoneSlots[0] === undefined) {
          $scope.slotsAvailable++;
          //console.log($scope.slotsAvailable);
        }
      }
    });

  };

  self._findPhoneInAvailable = function(phoneId) {
    for (var i=0; i<$scope.order.availableInventory.length; i++) {
      if ($scope.order.availableInventory[i].id === phoneId) {
        return $scope.order.availableInventory[i];
      }
    }
  };

  /*$scope.pullInventory = function() {
    $scope.order.assignSelectIsVisible = !$scope.order.assignSelectIsVisible;
    //console.log('pull inventory', order.assignSelectIsVisible);
    self._updateState();
  };*/

  // WARNING: be careful to refer to phone by id, not inventory_id field
  $scope.assignInventory = function() {
    console.log('assigning ' + $scope.order.assignedPhoneId);
    for (var i=0; i<$scope.phoneSlots.length; i++) {
      if ($scope.phoneSlots[i] === undefined) {
        $scope.phoneSlots[i] = self._findPhoneInAvailable($scope.order.assignedPhoneId);
        $scope.slotsAvailable--;
        break;
      }
    }

  };

  // WARNING: be careful to refer to phone by id, not inventory_id field
  $scope.removeMatch = function(phoneId) {
    //console.log(phoneId, $scope.phoneSlots);
    for (var i=0; i<$scope.phoneSlots.length; i++) {
      if ($scope.phoneSlots[i].id === phoneId) {
        $scope.phoneSlots[i] = undefined;
        $scope.slotsAvailable++;
        break;
      }
    }

  };

  $scope.shipIt = function() {
    console.log("HELLO", $scope.form);
    $scope.form.shipment['qty'] = $scope.order.num_phones - $scope.slotsAvailable;
    $scope.form.shipment['order_id'] = $scope.order.id;
    $scope.form.shipment['phone_ids'] = $scope.phoneSlots;
    //$scope.form.shipment['delivery_type'] = ''
    DataService.createShipment($scope.form.shipment).then(function() {

    });
    // create shipment
    // create events
  };

};

angular.module('logisticsApp.controllers')
  .controller('ShipOrderCtrl', ShipOrderCtrl);