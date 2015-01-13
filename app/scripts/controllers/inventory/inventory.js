'use strict';

function InventoryCtrl($scope, $http, $window, $route, $routeParams, $location, DataService) {

  ListCtrl.call(this, $scope, DataService);

  $scope.data = {
    'current_order': undefined,
    'upcoming_orders': undefined
  };
  
  $scope.initFromData = function() {
    // get by inventory_id, not database record id
    $scope.invId = parseInt($routeParams.invIndex, 10);
    if ($scope.invId) { // detail view
      DataService.getItem($scope.invId).then(function(item) {
        $scope.item = item;
        $scope.item.last_imaged_display = $scope.getFormattedDate($scope.item.last_imaged);
        DataService.getCurrentOrder($scope.invId).then(function(current_order) {
          $scope.data.current_order = current_order;
          $scope.data.current_order.arrival_date_display = $scope.getFormattedDate($scope.data.current_order.arrival_date);
          $scope.data.current_order.departure_date_display = $scope.getFormattedDate($scope.data.current_order.departure_date_display);
        });

        DataService.getUpcomingOrders($scope.invId).then(function(upcoming_orders) {
          $scope.data.upcoming_orders = upcoming_orders;
          for (var j=0; j<upcoming_orders.length; j++) {
            $scope.data.upcoming_orders[j].arrival_date_display = $scope.getFormattedDate($scope.data.upcoming_orders[j].arrival_date);
            $scope.data.upcoming_orders[j].departure_date_display = $scope.getFormattedDate($scope.data.upcoming_orders[j].departure_date_display);
          }
        });
      });
    } else { // list view
      DataService.getInventory().then(function(data) {
        for (var i=0; i<data.length; i++) {
          if (data[i].last_imaged) {
            data[i].last_imaged_display = $scope.getFormattedDate(data[i].last_imaged);
          }
        }
        $scope.inventory = data;
      });  
    }
  };
  $scope.initFromData();
  
};


InventoryCtrl.prototype = Object.create(ListCtrl.prototype);

angular.module('logisticsApp.controllers')
.controller('InventoryCtrl', InventoryCtrl);
