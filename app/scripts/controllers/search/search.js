'use strict';

function SearchCtrl($scope, $location, $route, $routeParams, DataService) {
	
	$scope.data = {
		query: '',
		results: []
	};

	$scope.initFromData = function() {

		$scope.data.query = $routeParams.q;
    DataService.searchAll($scope.data.query).then(function(data) {
  		$scope.data.results = data;
    });
  };
  $scope.initFromData();

  $scope.doSearch = function() {
  	if ($scope.data.query) {
	    $location.path('search').search({ 'q': $scope.data.query });
	  }
  };
};

angular.module('logisticsApp.controllers')
.controller('SearchCtrl', SearchCtrl);