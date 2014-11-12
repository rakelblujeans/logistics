angular.module('logisticsApp.controllers')
  .filter('sortOrderIcon', function() {
		return function(input) {
  		return input ? '\u25B2' : '\u25BC';
		};
	});
