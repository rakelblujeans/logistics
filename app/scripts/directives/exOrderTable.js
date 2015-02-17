'use strict';

function ExOrderTable(CommonCode, OrderService) {

	var controller = function() {

		this.orderBy = { 
	    columnName: 'arrival_date',
	    descending: false
	  };
	  this.orders = [];
	  this.data = [];
	  this.modal = { order: {} };

	  this.refreshData = function() {
	  	if (!this.pullDataFn) { return; }
	  	this.pullDataFn(this.options).then(function(data) {
        this.orders = data;
        for (var i=0; i<this.orders.length; i++) {
          this.orders[i].arrival_date_display = CommonCode.getFormattedDate(this.orders[i].arrival_date);
          this.orders[i].departure_date_display = CommonCode.getFormattedDate(this.orders[i].departure_date);
          for (var z=0; z<this.orders[i].shipments.length; z++) {
            this.orders[i].shipments[z].out_on_date_display = CommonCode.getFormattedDate(this.orders[i].shipments[z].out_on_date);
          }

          var order = this.orders[i];
          var id = order.id;

          this.data[id] = {
            'assignedPhoneIds': CommonCode.buildPhoneIdString(order),
            'assignmentOptionsVisible': false
          };
          this.data[order.id].slotsAvailable = order.num_phones - CommonCode.getPhoneIds(order).length;
        }
      }.bind(this));
	  };
	  this.refreshData();

		this._updateOrder = function(oldOrder, newOrder) {
      oldOrder = newOrder;
      for(var i=0; i<this.orders.length; i++) {
        if (this.orders[i].id === newOrder.id) {
          this.orders[i].phones = newOrder.phones;
        }
      }
	  };

	  // WARNING: be careful to refer to phone by id, not inventory_id field
	  this.assignDevice = function(order) {
	    OrderService.assignDevice(order.id, order.assignedInventoryItem).then(
	      function(updatedOrder) {
	        // refresh order with latest confirmed info from the server
	        this._updateOrder(order, updatedOrder);
	        this.data[order.id].slotsAvailable--;
	        CommonCode.getAvailableInventory(updatedOrder, this.data[order.id]);
	    }.bind(this));
	  };

	  // WARNING: be careful to refer to phone by id, not inventory_id field
	  this.unassignDevice = function(order, phoneId) {
	    OrderService.unassignDevice(order.id, phoneId).then(function(updatedOrder) {
	      // refresh order with latest confirmed info from the server
	      this._updateOrder(order, updatedOrder);
	      this.data[order.id].slotsAvailable++;
	      CommonCode.getAvailableInventory(updatedOrder, this.data[order.id]);
	    }.bind(this));
	  };

	  this.showInventoryOptions = function(order) {
	  	// collapse all other rows
      for(var i=0; i<this.orders.length; i++) {
        this.data[this.orders[i].id].assignmentOptionsVisible = false;  
      }
      // only expand this order's row
      this.data[order.id].assignmentOptionsVisible = !this.data[order.id].assignmentOptionsVisible;
      this.modal.order = order;
      // pull latest inventory data
      CommonCode.getAvailableInventory(order, this.data[order.id]);
	  };

	  this._dismissModal = function() {
	  	this.modal.order = undefined;
	    // modal css clean up (bug in bootstrap related to fade-in)
	    $('#myModal').modal('hide');
	    $('body').removeClass('modal-open');
	    $('.modal-backdrop').remove();
	  };

	  this.dismiss = function() {
	    this._dismissModal();
	  };

	  this.verifyOrder = function(order, isVerified) {
	    this._dismissModal();

	    OrderService.markVerified(order.id, isVerified).then(function() {
	      delete this.data[order.id];

        for(var i=0; i<this.orders.length; i++) {
          if (this.orders[i].id === order.id) {
            this.orders.splice(i, 1);
          }
        }
	    }.bind(this));
	  };

	  this.isCancelable = function(order) {
	    if (!order.active) {
	      return false;
	    }

	    var cutoff = new Date();
	    cutoff.setDate(cutoff.getDate() + OrderService.timeSpentSendingDelivery());
	    var arrival = new Date(order.arrival_date);
	    if (arrival >= cutoff) {
	      return true;
	    }
	    else {
	      return false;
	    }
	  };

	  this.canReactivate = function(order) {
	    if (order.active) {
	      return false;
	    }

	    var cutoff = new Date();
	    cutoff.setDate(cutoff.getDate() + OrderService.timeSpentSendingDelivery());
	    var arrival = new Date(order.arrival_date);
	    if (arrival >= cutoff) {
	      return true;
	    }
	    else {
	      return false;
	    }
	  };

	  this.toggleOrderCanceled = function(order) {
	    OrderService.toggleOrderActivation(order.id).then(function() {
	      this.refreshData();
	    }.bind(this)); 
	  };
	
	};

	return {
		restrict: 'E',
		scope: {
			options:'=',
			pullDataFn:'=' // why not &?
    },
    templateUrl: '/scripts/directives/ex-order-table.html',
		bindToController: true,
    controllerAs: 'ctrl',
		controller: controller
	};
}

ExOrderTable.$inject = ['CommonCode', 'OrderService'];

angular.module('logisticsApp.directives')
.directive('exOrderTable', ExOrderTable);