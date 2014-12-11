'use strict';

function HomeCtrl($scope, DataService) {
    
  $scope.data = {
  	today: {
	  	incoming: [],
	  	outbound: []
	  },
	  tomorrow: {
	  	incoming: [],
	  	outbound: []
	  }
  };

  function ymd(date) {
		// GET YYYY, MM AND DD FROM THE DATE OBJECT
		var yyyy = date.getFullYear().toString();
		var mm = (date.getMonth()+1).toString();
		var dd  = date.getDate().toString();
		// CONVERT mm AND dd INTO chars
		var mmChars = mm.split('');
		var ddChars = dd.split('');
		 
		// CONCAT THE STRINGS IN YYYY-MM-DD FORMAT
		var datestring = yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
		return datestring;
  };

	$scope.initFromData = function() {
		var today = new Date();

    DataService.getIncomingInventory(ymd(today)).then(function(inboundPhones) {
  		$scope.data.today.incoming = inboundPhones;
    });

    var tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
    DataService.getIncomingInventory(ymd(tomorrow)).then(function(outboundPhones) {
  		$scope.data.today.outbound = outboundPhones;
    });
  };
  $scope.$on('$viewContentLoaded', $scope.initFromData);

};

angular.module('logisticsApp.controllers')
.controller('HomeCtrl', HomeCtrl);