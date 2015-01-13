'use strict';

angular.module('logisticsApp.services')
.directive('logSearch', function () {
	return {
		restrict: 'E',
		scope: {
      data: '=info'
    },
    // same as '=customer'
  	//customer: '='
		templateUrl: 'log-search.html',
		link: function link(scope, element, attrs) {}
	};
});