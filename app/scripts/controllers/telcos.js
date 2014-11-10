'use strict';

angular.module('logisticsApp.controllers')
  .controller('TelcoCtrl', ['$scope', '$http', '$window', 'DataService', 
  	function ($scope, $http, $window, DataService) {
    
    $scope.initFromData = function() {

   		$scope.other = DataService.getTelcos().then(function(data) {
    		$scope.telcos = data;
    	});
	};
    $scope.$on('$viewContentLoaded', $scope.initFromData);

  }]);
