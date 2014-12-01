'use strict';

function CalendarController(
  $scope, $http, $window, $route, $routeParams, DataService) {
  
	$scope.timeSliceEnum = {
		'2weeks': 14,
		'month:' 30,
		'3months': 90,
		'6months': 180
	};
  $scope.calendar = {
  	slice: $scope.timeSliceEnum.2weeks,
  	days = []
  };


  $scope.initFromData = function() {
      var start = new Date();
      var end = start.setDate(start.getDate() + $scope.calendar.slice);
			var days = [];
			for (var d = start; d <= end; d.setDate(d.getDate() + 1)) {
			    days.push(new Date(d));
			}

			$scope.calendar.days = days;
			console.log(days);
  };
  $scope.$on('$viewContentLoaded', $scope.initFromData);
};


angular.module('logisticsApp.controllers')
.controller('CalendarController', CalendarController);
