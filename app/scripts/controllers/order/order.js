'use strict';

function OrderCtrl($scope, $route, $routeParams, DataService) {
  
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

    /*DataService.getInventoryAvailability(order.order_id).then(function(inventory) {
      order.availableInventory = inventory;
    });*/

};

OrderCtrl.prototype = Object.create(ListCtrl.prototype);

angular.module('logisticsApp.controllers')
  .controller('OrderCtrl', OrderCtrl);