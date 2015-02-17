'use strict';

// NOTE: was able to eliminate scope entire, just use this

function SearchCtrl($location, $route, $routeParams, DataService) {
	
	this.data = {
		query: '',
		results: []
	};

	this.initFromData = function() {
		this.data.query = $routeParams.q;
    DataService.searchAll(this.data.query).then(function(d) {
    	this.data.results = d;
    	console.log(this.data);
    }.bind(this));
  };
  this.initFromData();
};

SearchCtrl.$inject = ['$location', '$route', '$routeParams', 'DataService'];

angular.module('logisticsApp.controllers')
.controller('SearchCtrl', SearchCtrl);