'use strict';

function ExSearch($location) {

	var controller = function() {
		this.query = '';

		this.doSearch = function() {
	    $location.path('search').search({ 'q': this.query });
	  };
	};

	return {
		restrict: 'E',
		scope: {
      orders: '=',
    },
    templateUrl: '/scripts/directives/ex-search.html',
		bindToController: true,
    controllerAs: 'ctrl',
    controller: controller
	};
}

ExSearch.$inject = ['$location'];

angular.module('logisticsApp.directives')
.directive('exSearch', ExSearch);