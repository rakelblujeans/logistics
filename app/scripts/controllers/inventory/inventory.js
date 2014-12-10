'use strict';

function InventoryCtrl($scope, $http, $window, $route, $routeParams, $location, DataService) {

  ListCtrl.call(this, $scope, DataService);

  $scope.data = {
    'upcoming_orders': undefined
  };

  $scope.initFromData = function() {
    $scope.invId = parseInt($routeParams.invIndex, 10);
    if ($scope.invId) { // detail view
      DataService.getItem($scope.invId).then(function(item) {
        $scope.item = item;
        DataService.getTelcoName(item.provider_id).then(function(telcoName){
          $scope.item['providerName'] = telcoName;
        });
        DataService.getUpcomingOrders($scope.invId).then(function(upcoming_orders) {
          $scope.data.upcoming_orders = upcoming_orders;
        });
      });
    } else { // list view
      DataService.getInventory().then(function(data) {
        $scope.inventory = data;
      });  
    }
  };
  $scope.$on('$viewContentLoaded', $scope.initFromData);
};

InventoryCtrl.prototype = Object.create(ListCtrl.prototype);

angular.module('logisticsApp.controllers')
.controller('InventoryCtrl', InventoryCtrl);
