'use strict';

function OrderCtrl($scope, $route, $routeParams, DataService, $timeout) {
  
  ListCtrl.call(this, $scope, DataService);

  $scope.initFromData = function() {
    
    $scope.unmatched = parseInt($routeParams.unmatched);
    $scope.orderId = parseInt($routeParams.orderIndex, 10);

    if ($scope.orderId) { // detail view
      DataService.getOrder($scope.orderId).then(function(order) {
        $scope.order = order;
      });
    } else { // list view
      DataService.getOrders($scope.unmatched).then(function(data) {
        $scope.orders = data;
      });
    }
  };
  $scope.$on('$viewContentLoaded', $scope.initFromData);

  self._updateState = function(order) {
    var promise = DataService.checkInventoryState(order).then(function(data) {
      order.availableInventory = data.availableInventory;
      order.phoneSlots = data.assignedInventory;
      order.slotsAvailable = 0;
      for (var i=0; i<order.phoneSlots.length; i++) {
        if (order.phoneSlots[0] === undefined) {
          order.slotsAvailable++;
        }
      }
    });

    return promise;
  };


  $scope.pullInventory = function(order) {
    order.assignSelectIsVisible = !order.assignSelectIsVisible;
    //console.log('pull inventory', order.assignSelectIsVisible);
    self._updateState(order);
  };

  $scope.updateAssignedInventory = function(order) {
    console.log('updated', order.assignedInventoryItem);
    order.slotsEmpty = false;
    
    DataService.sendMatchedInventoryEvent(order.id, order.assignedInventoryItem).then(
      function(new_event) {
        // refresh order with latest confirmed info from the server
        self._updateState(order).then(function() {
          
            // TODO
            // if all are full, setTimeout and fade collapse
            //order.assignSelectIsVisible = false;
            //$timeout(function() {}, 2000);
        });
    });
  };

  $scope.removeMatch = function(inventory_id) {

  };


};

OrderCtrl.prototype = Object.create(ListCtrl.prototype);

angular.module('logisticsApp.controllers')
  .controller('OrderCtrl', OrderCtrl);