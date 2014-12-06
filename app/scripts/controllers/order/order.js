'use strict';

function OrderCtrl($scope, $route, $routeParams, DataService, $timeout) {

  ListCtrl.call(this, $scope, DataService);

  $scope.initFromData = function() {
    
    $scope.unmatched = parseInt($routeParams.unmatched);
    $scope.orderId = parseInt($routeParams.id, 10);

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
    order.slotsAvailable = 0;
    var promise = DataService.checkInventoryState(order).then(function(data) {
      order.availableInventory = data.availableInventory;
      order.phoneSlots = data.assignedInventory;
      //console.log("phoneSlots", order.phoneSlots);

      for (var i=0; i<order.phoneSlots.length; i++) {
        if (order.phoneSlots[i] === undefined) {
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

  // WARNING: be careful to refer to phone by id, not inventory_id field
  $scope.updateAssignedInventory = function(order) {
    //console.log('updated', order.assignedInventoryItem);
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

  // WARNING: be careful to refer to phone by id, not inventory_id field
  $scope.removeMatch = function(order, phoneId) {
    DataService.removeMatchedInventory(order.id, phoneId).then(function() {
      // refresh order with latest confirmed info from the server
      self._updateState(order);
    });
  };

};

OrderCtrl.prototype = Object.create(ListCtrl.prototype);

angular.module('logisticsApp.controllers')
  .controller('OrderCtrl', OrderCtrl);