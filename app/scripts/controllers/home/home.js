'use strict';

function HomeCtrl($scope, $location, DataService) {
    
  $scope.data = {
  	today: {
	  	incoming: [],
	  	outbound: []
	  },
	  tomorrow: {
	  	incoming: [],
	  	outbound: []
	  },
    warnings: {
      overdue: [],
    },
    modal: {
      phones: [],
      selection: []
    },
    received_inventory: [],
    inventory_id2: '',
    query: ''
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

  $scope.getWarnings = function() {
    $scope.data.warnings.overdue = [];

    // overdue incoming orders
    DataService.getOverdueOrders().then(function(orders) {
      $scope.data.warnings.overdue = orders;
    });

    // orders overdue on shipping
    DataService.getOverdueShipping().then(function(orders) {
      $scope.data.warnings.overdue_shipping = orders;
    });

    // orders missing phones
    DataService.getOrdersMissingPhones().then(function(orders) {
      $scope.data.warnings.missing_phones = orders;
    });
  };

	$scope.initFromData = function() {
		var today = new Date();

    DataService.getIncomingOrders(ymd(today)).then(function(inboundData) {
  		$scope.data.today.incoming = inboundData;
    });
    DataService.getOutboundOrders(ymd(today)).then(function(outboundData) {
  		$scope.data.today.outbound = outboundData;
    });

    var tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		DataService.getIncomingOrders(ymd(tomorrow)).then(function(inboundData) {
  		$scope.data.tomorrow.incoming = inboundData;
    });
    DataService.getOutboundOrders(ymd(tomorrow)).then(function(outboundData) {
  		$scope.data.tomorrow.outbound = outboundData;
    });

    $scope.getWarnings();
  };
  $scope.initFromData();

  $scope.doSearch = function() {
    $location.path('search').search({ 'q': $scope.data.query });;
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
    for (var i=0; i<phones.length; i++) {
      $scope.data.modal.selection.push(phones[i].id);
    }
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