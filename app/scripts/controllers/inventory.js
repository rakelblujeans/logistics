'use strict';

angular.module('logisticsApp.controllers')
  .controller('InventoryCtrl', ['$scope', '$http', '$window', '$route', '$routeParams', '$location', 'DataService', 
  	function ($scope, $http, $window, $route, $routeParams, $location, DataService) {

    $scope.sort = {
      column: 'id',
      descending: false
    };
    $scope.ascending = true;

    $scope.initFromData = function() {
      $scope.other = DataService.getInventory().then(function(data) {
        $scope.inventory = data;
      });
    };
    $scope.$on('$viewContentLoaded', $scope.initFromData);

    $scope.changeSorting = function(column) {
      var sort = $scope.sort;
      if (sort.column === column) {
          sort.descending = !sort.descending;
      } else {
          sort.column = column;
          sort.descending = false;
      }
      
      $scope.ascending = !sort.descending;
    };

    $scope.toggleActivation = function(index) {
      DataService.setActive('phones', $scope.inventory[index].id, 
        !$scope.inventory[index].active).then(function(success){
        if (success) {
          $scope.inventory[index].active = !$scope.inventory[index].active;
        }
      });
    };

}]);

    /*$scope.$on('$viewContentLoaded', angular.bind(this, function() {
      DataService.getInventory().then(function(data) {
        $scope.inventory = data;
      });
    }));*/

