'use strict';

angular.module('logisticsApp.controllers')
  .controller('CustomerCtrl', ['$scope', '$http', '$window', 'DataService', 
  	function ($scope, $http, $window, DataService) {
    
    $scope.initFromData = function() {

   		$scope.other = DataService.getCustomers().then(function(data) {
    		$scope.customers = data;
    	});
	};
    $scope.$on('$viewContentLoaded', $scope.initFromData);

  }]);
