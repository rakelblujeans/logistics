'use strict';

angular.module('logisticsApp.controllers')
  .controller('OrderCtrl', ['$scope', '$http', '$window', 'DataService', 
  	function ($scope, $http, $window, DataService) {
    
    $scope.sort = {
      column: 'id',
      descending: false
    };
    $scope.ascending = true;

    $scope.initFromData = function() {
   		$scope.other = DataService.getOrders().then(function(data) {
    		$scope.orders = data;
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
      //console.log($scope.customers[index]);
      DataService.setActive('orders', $scope.orders[index].id, 
        !$scope.orders[index].active).then(function(success){
        if (success) {
          $scope.orders[index].active = !$scope.orders[index].active;
        }
      });
    };

  }]);
