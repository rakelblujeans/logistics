'use strict';

angular.module('logisticsApp.controllers')
  .controller('InventoryCtrl', ['$scope', '$http', '$window', 'DataService', 
  	function ($scope, $http, $window, DataService) {
    
    $scope.initFromData = function() {

   		$scope.other = DataService.getInventory().then(function(data) {
    		$scope.inventory = data;
    	});
	};
    $scope.$on('$viewContentLoaded', $scope.initFromData);

  }]);
