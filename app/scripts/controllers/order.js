'use strict';

angular.module('logisticsApp.controllers')
  .controller('OrderCtrl', ['$scope', '$http', '$window', 'DataService', 
  	function ($scope, $http, $window, DataService) {
    
    $scope.initFromData = function() {

   		$scope.other = DataService.getOrders().then(function(data) {
    		$scope.orders = data;
    	});
	};
    $scope.$on('$viewContentLoaded', $scope.initFromData);

  }]);
