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
	  },
    modal: {
      phones: [],
      selection: []
    },
    received_inventory: [],
    inventory_id2: ''
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
    DataService.getOutboundInventory(ymd(today)).then(function(inboundPhones) {
  		$scope.data.today.outbound = inboundPhones;
    });

    var tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		DataService.getIncomingInventory(ymd(tomorrow)).then(function(inboundPhones) {
  		$scope.data.tomorrow.incoming = inboundPhones;
    });
    DataService.getOutboundInventory(ymd(tomorrow)).then(function(outboundPhones) {
  		$scope.data.tomorrow.outbound = outboundPhones;
    });
  };
  $scope.initFromData();

  $scope.doSearch = function() {

  };

  function _processReceivedCallback(returned_phones) {
    var returned_ids = [];
    for (var i=0; i<returned_phones.length; i++) {
      returned_ids[i] = returned_phones[i].id;
    }
    $scope.data.received_inventory = returned_ids;
    $('#confirmationModal').modal('show');
    $scope.data.inventory_id2 = '';
  }

  $scope.markReceived = function(ids) {
    $scope.data.received_inventory = [];
    if (ids) {
      var idArray = ids.split(',');
      DataService.checkInInventory(idArray).then(function(returned_phones) {
        _processReceivedCallback(returned_phones);
        $scope.initFromData();
      });
    } else {
      DataService.checkInInventory($scope.data.modal.selection).then(function(returned_phones) {
        _processReceivedCallback(returned_phones);
        $scope.initFromData();
      });  
    }
  	
  };

  $scope.showCheckInModal = function(phones) {
    $scope.data.modal.phones = phones;
  };

  // toggle selection for a given phone by name
  $scope.toggleSelection = function(phoneId) {
    var idx = $scope.data.modal.selection.indexOf(phoneId);

    // is currently selected
    if (idx > -1) {
      $scope.data.modal.selection.splice(idx, 1);
    } else { 
    // is newly selected
      $scope.data.modal.selection.push(phoneId);
    }
  };
};

angular.module('logisticsApp.controllers')
.controller('HomeCtrl', HomeCtrl);