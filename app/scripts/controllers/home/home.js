'use strict';

function HomeCtrl($location, CommonCode, ModalLogic, InventoryService, OrderService) {
    
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
  };

  this.modalObj = ModalLogic;
  
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
    OrderService.getOverdueOrders().then(function(orders) {
      this.data.warnings.overdue = orders;
    }.bind(this));

    // orders overdue on shipping
    OrderService.getOverdueShipping().then(function(orders) {
      this.data.warnings.overdue_shipping = orders;
    }.bind(this));

    // orders missing phones
    OrderService.getOrdersMissingPhones().then(function(orders) {
      this.data.warnings.missing_phones = orders;
    }.bind(this));
  };

	this.initFromData = function() {
		var today = new Date();

    OrderService.getIncoming(this.ymd(today)).then(function(inboundData) {
  		this.data.today.incoming = inboundData;
    }.bind(this));

    OrderService.getOutbound(this.ymd(today)).then(function(outboundData) {
  		this.data.today.outbound = outboundData;
    }.bind(this));

    var tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		OrderService.getIncoming(this.ymd(tomorrow)).then(function(inboundData) {
  		this.data.tomorrow.incoming = inboundData;
    }.bind(this));

    OrderService.getOutbound(this.ymd(tomorrow)).then(function(outboundData) {
  		this.data.tomorrow.outbound = outboundData;
    }.bind(this));

    this.getWarnings();
  };
  this.initFromData();

};

HomeCtrl.$inject = ['$location', 'CommonCode', 'ModalLogic', 'InventoryService', 'OrderService'];

angular.module('logisticsApp.controllers')
.controller('HomeCtrl', HomeCtrl);