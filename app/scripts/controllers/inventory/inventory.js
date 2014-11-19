'use strict';

function InventoryCtrl($scope, $http, $window, $route, $routeParams, $location, DataService) {

  ListCtrl.call(this, $scope);

  $scope.initFromData = function() {
    $scope.invId = parseInt($routeParams.invIndex, 10);
    if ($scope.invId) {
      DataService.getItem($scope.invId).then(function(item) {
        $scope.item = item;
        DataService.getTelcoName(item.provider_id).then(function(telcoName){
          $scope.item['providerName'] = telcoName;
        });
      });
    } else {
      DataService.getInventory().then(function(data) {
        $scope.inventory = data;
      });  
    }
  };
  $scope.$on('$viewContentLoaded', $scope.initFromData);
};

InventoryCtrl.prototype.toggleActivation = function(index) {
  DataService.setActive('phones', $scope.inventory[index].id, 
    !$scope.inventory[index].active).then(function(success){
    if (success) {
      $scope.inventory[index].active = !$scope.inventory[index].active;
    }
  });
};

angular.module('logisticsApp.controllers')
.controller('InventoryCtrl', InventoryCtrl);
