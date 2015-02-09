'use strict';

function HomeCtrl($location, DataService) {
    
  this.data = {
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
  
  this.ymd = function(date) {
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

  this.getWarnings = function() {
    this.data.warnings.overdue = [];

    // overdue incoming orders
    var thisCopy = this;
    DataService.getOverdueOrders().then(function(orders) {
      thisCopy.data.warnings.overdue = orders;
    });
    // this.data = thisCopy.data;

    // orders overdue on shipping
    DataService.getOverdueShipping().then(function(orders) {
      thisCopy.data.warnings.overdue_shipping = orders;
    });
    // this.data = thisCopy.data;

    // orders missing phones
    DataService.getOrdersMissingPhones().then(function(orders) {
      thisCopy.data.warnings.missing_phones = orders;
    });
    this.data = thisCopy.data;
  };

	this.initFromData = function() {
		var today = new Date();
    var thisCopy = this;

    DataService.getIncomingOrders(this.ymd(today)).then(function(inboundData) {
  		thisCopy.data.today.incoming = inboundData;
    });
    //this.data = thisCopy.data;

    DataService.getOutboundOrders(this.ymd(today)).then(function(outboundData) {
  		thisCopy.data.today.outbound = outboundData;
    });
    //this.data = thisCopy.data;

    var tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		DataService.getIncomingOrders(this.ymd(tomorrow)).then(function(inboundData) {
  		thisCopy.data.tomorrow.incoming = inboundData;
    });
    //this.data = thisCopy.data;

    DataService.getOutboundOrders(this.ymd(tomorrow)).then(function(outboundData) {
  		thisCopy.data.tomorrow.outbound = outboundData;
    });
    this.data = thisCopy.data;

    this.getWarnings();
  };
  this.initFromData();

  this.doSearch = function() {
    $location.path('search').search({ 'q': this.data.query });;
  };

  this._processReceivedCallback = function(returned_phones) {
    var returned_ids = [];
    for (var i=0; i<returned_phones.length; i++) {
      returned_ids[i] = returned_phones[i].id;
    }
    this.data.received_inventory = returned_ids;
    $('#confirmationModal').modal('show');
    this.data.inventory_id2 = '';
  }

  this.markReceived = function(ids) {
    this.data.received_inventory = [];
    var thisCopy = this;
    if (ids) {
      var idArray = ids.split(',');
      DataService.checkInInventory(idArray).then(function(returned_phones) {
        thisCopy._processReceivedCallback(returned_phones);
        thisCopy.initFromData();
      });
    } else {
      DataService.checkInInventory(this.data.modal.selection).then(function(returned_phones) {
        thisCopy._processReceivedCallback(returned_phones);
        thisCopy.initFromData();
      });  
    }
  };

  this.showCheckInModal = function(phones) {
    this.data.modal.phones = phones;
    for (var i=0; i<phones.length; i++) {
      this.data.modal.selection.push(phones[i].id);
    }
  };

  // toggle selection for a given phone by name
  this.toggleSelection = function(phoneId) {
    var idx = this.data.modal.selection.indexOf(phoneId);

    // is currently selected
    if (idx > -1) {
      this.data.modal.selection.splice(idx, 1);
    } else { 
    // is newly selected
      this.data.modal.selection.push(phoneId);
    }
  };

};

angular.module('logisticsApp.controllers')
.controller('HomeCtrl', HomeCtrl);