'use strict';

angular.module('logisticsApp.controllers')
  .controller('CustomerCtrl', ['$scope', '$http', '$window', 'DataService', 
  	function ($scope, $http, $window, DataService) {
    
    $scope.sort = {
      column: 'id',
      descending: false
    };
    $scope.ascending = true;

    $scope.initFromData = function() {
   		$scope.other = DataService.getCustomers().then(function(data) {
    		$scope.customers = data;
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

    $scope.deactivate = function() {
      DataService.deactivateCustomer('customers', $scope.custId);
      // TODO: add spinner until confirmed saved
      //$location.path('customers/' + $scope.custId);
    };

    $scope.activate = function() {
      DataService.activateCustomer('customers', $scope.custId);
    };

    $scope.toggleActivation = function(index) {
    	console.log($scope.customers[index]);
    	DataService.setActive('customers', $scope.customers[index].id, !$scope.customers[index].active).then(function(success){
    		if (success) {
    			$scope.customers[index].active = !$scope.customers[index].active;
    		}
    	});
    };

  }]);
