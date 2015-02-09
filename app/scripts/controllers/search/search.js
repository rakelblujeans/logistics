'use strict';

// NOTE: was able to eliminate scope entire, just use this

function SearchCtrl($location, $route, $routeParams, DataService) {
	
	this.data = {
		query: '',
		results: []
	};

	this.initFromData = function() {

		this.data.query = $routeParams.q;
		var myData = this.data;
    DataService.searchAll(this.data.query).then(function(d) {
    	console.log(myData);
  		myData.results = d;
    });
    this.data = myData;
  };
  this.initFromData();

  this.doSearch = function() {
  	if (this.data.query) {
	    $location.path('search').search({ 'q': this.data.query });
	  }
  };
};

angular.module('logisticsApp.controllers')
.controller('SearchCtrl', SearchCtrl);