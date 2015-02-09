 'use strict';

function OrderCtrl($route, $routeParams, DataService, $timeout, CommonCode) {

  this.sort = CommonCode.sort;
  this.ascending = CommonCode.ascending;
  this.changeSorting = CommonCode.changeSorting;

  /* Each order is going to have a data block associated with it. Data model will look
   * something like:
   * 
   * scope.orders = [{order}, {order}, ...] // <- from back end data
   * scope.data = [{order data}, {order data}, ...] <-- holds front end generated data
   *
   * Each order's data will look like:
   * scope.data = {
   *   order_id: {
   *     assignmentOptionsVisible: false,
   *     slotsAvailable: X,
   *     phoneSlots: [{phone}, {phone}, ...],
   *     assignedPhoneId: Y, ...
   * }}
   * 
   */
  this.data = {};
  this.options = {}; // holds routeParam options
  
  this.getPhoneIds = function(order) {
    var assignedPhones = [];
    for(var i=0; i<order.phones.length; i++) {
      if (order.phones[i]) {
        // always display by human-readable "inventory_id", not database id
        assignedPhones[assignedPhones.length] = order.phones[i].inventory_id;
      }
    }
    return assignedPhones;
  };

  this.buildPhoneIdString = function(order) {
    return "[" + this.getPhoneIds(order).join(",") + "]"
  };

  this.setPageTitle = function(options) {
    if (options.unverified) {
      this.data.pageTitle = "Pending orders";
    } else if (options.unshipped) {
      this.data.pageTitle = "Orders ready for delivery"
    } else {
      this.data.pageTitle = "All Orders";
    }
  };

  this._dismissModal = function() {
    // modal css clean up (bug in bootstrap related to fade-in)
    $('#myModal').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  };

  this._buildOrderHistory = function(order) {
    this.data.shipmentPhoneIds = {};
    for(var j=0; j<order.shipments.length; j++) {
      var phoneIds = [];
      
      for(var k=0; k<order.shipments[j].phones.length; k++) {
        phoneIds[k] = order.shipments[j].phones[k].id;
      }
      this.data.shipmentPhoneIds[order.shipments[j].id] = '[' + phoneIds.join(',') + ']';
    }
  };

  this._getAvailableInventory = function(order) {
    var orderData = this.data[order.id];
    orderData.phoneSlots = order.phones;

    orderData.assignedPhoneIds = this.buildPhoneIdString(order);
    var thisCopy = this;
    var promise = DataService.getInventoryAvailability(order.arrival_date, order.departure_date).then(function(data) {
      orderData.availableInventory = data;
      orderData.slotsAvailable = 0;
      for (var i=0; i<order.num_phones; i++) {
        if (order.phones[i] === undefined) {
          orderData.slotsAvailable++;
        }
      }

      thisCopy.data[order.id] = orderData;
    });
    this.data = thisCopy.data;
    

    return promise;
  };

  this._updateOrder = function(oldOrder, newOrder) {
    if (this.order) { 
      this.order = newOrder;
    } else {
      oldOrder = newOrder;
      for(var i=0; i<this.orders.length; i++) {
        if (this.orders[i].id === newOrder.id) {
          this.orders[i].phones = newOrder.phones;
        }
      }
    }
  };

  this.initFromData = function() {
    this.sort.column = 'arrival_date'

    if ($routeParams.verifiedState) {
      this.options = {
        unverified: $routeParams.verifiedState == false,
        unshipped: $routeParams.verifiedState == true };
    }
    this.setPageTitle(this.options);
    var orderId = $routeParams.id;

    var thisCopy = this;
    if (orderId) { // detail view
      DataService.getOrder(orderId).then(function(order) {
        thisCopy.order = order;
        thisCopy.order.arrival_date_display = CommonCode.getFormattedDate(thisCopy.order.arrival_date);
        thisCopy.order.departure_date_display = CommonCode.getFormattedDate(thisCopy.order.departure_date);
        for (var i=0; i<thisCopy.order.phones.length; i++) {
          thisCopy.order.phones[i].last_imaged_display = CommonCode.getFormattedDate(thisCopy.order.phones[i].last_imaged)
        } 
        for (var z=0; z<thisCopy.order.shipments.length; z++) {
          thisCopy.order.shipments[z].out_on_date_display = CommonCode.getFormattedDate(thisCopy.order.shipments[z].out_on_date);
        }

        thisCopy.data[order.id] = {};
        thisCopy._getAvailableInventory(thisCopy.order);
        thisCopy._buildOrderHistory(order);
      });
      this.order = thisCopy.order;
      this.data = thisCopy.data;

    } else { // list view
      DataService.getOrders(this.options).then(function(data) {
        thisCopy.orders = data;
        for (var i=0; i<thisCopy.orders.length; i++) {
          var order = thisCopy.orders[i];
          thisCopy.orders[i].arrival_date_display = CommonCode.getFormattedDate(thisCopy.orders[i].arrival_date);
          thisCopy.orders[i].departure_date_display = CommonCode.getFormattedDate(thisCopy.orders[i].departure_date);
          for (var z=0; z<thisCopy.orders[i].shipments.length; z++) {
            thisCopy.orders[i].shipments[z].out_on_date_display = CommonCode.getFormattedDate(thisCopy.orders[i].shipments[z].out_on_date);
          }
          var id = order.id;

          thisCopy.data[id] = {
            'assignedPhoneIds': thisCopy.buildPhoneIdString(order),
            'assignmentOptionsVisible': false
          };
          thisCopy.data[order.id].slotsAvailable = order.num_phones - thisCopy.getPhoneIds(order).length;
        }
      });
      this.orders = thisCopy.orders;
      this.data = thisCopy.data;

    }
  };
  this.initFromData();
  
  this.showInventoryOptions = function(order) {
    if (this.order) {
      this._getAvailableInventory(order);
    } else {
      // collapse all other rows
      for(var i=0; i<this.orders.length; i++) {
        this.data[order.id].assignmentOptionsVisible = false;  
      }
      // only expand this order's row
      this.data[order.id].assignmentOptionsVisible = !this.data[order.id].assignmentOptionsVisible;
      // pull latest inventory data
      this._getAvailableInventory(order);
    }
  };

  // WARNING: be careful to refer to phone by id, not inventory_id field
  this.assignDevice = function(order) {
    var thisCopy = this;
    DataService.assignDevice(order.id, order.assignedInventoryItem).then(
      function(updatedOrder) {
        // refresh order with latest confirmed info from the server
        thisCopy._updateOrder(order, updatedOrder);
        thisCopy.data[order.id].slotsAvailable--;
        thisCopy._getAvailableInventory(updatedOrder);
    });
    this.data = thisCopy.data;
  };

  // WARNING: be careful to refer to phone by id, not inventory_id field
  this.unassignDevice = function(order, phoneId) {
    var thisCopy = this;
    DataService.unassignDevice(order.id, phoneId).then(function(updatedOrder) {
      // refresh order with latest confirmed info from the server
      thisCopy._updateOrder(order, updatedOrder);
      thisCopy.data[order.id].slotsAvailable++;
      thisCopy._getAvailableInventory(updatedOrder);
    });
    this.data = thisCopy.data;
  };

  this.verifyOrder = function(order, isVerified) {
    this._dismissModal();

    var thisCopy = this;
    DataService.markVerified(order.id, isVerified).then(function() {
      delete thisCopy.data[order.id];

      if (thisCopy.orders) { // if on list page
        for(var i=0; i<thisCopy.orders.length; i++) {
          if (thisCopy.orders[i].id === order.id) {
            thisCopy.orders.splice(i, 1);
          }
        }
      } else { // if on detail page
        thisCopy.order.is_verified = order.is_verified; //true;
      }
    });
    this.data = thisCopy.data;
    this.orders = thisCopy.orders;
    this.order = thisCopy.order;
  }

  this.dismiss = function(order) {
    this._dismissModal();
    // only need to update the phone list if 
    // we are on the detail page
    if (this.order) {
      this._getAvailableInventory(order);
    }
  };

  this.togglePhoneActivation = function(item) {
    var thisCopy = this;
    DataService.togglePhoneActivation(item.id).then(function(phone){
      thisCopy.initFromData();
    });
  };

  this.isCancelable = function(order) {
    if (!order.active)
      return false;

    var cutoff = new Date();
    cutoff.setDate(cutoff.getDate() + DataService.timeSpentSendingDelivery())
    var arrival = new Date(order.arrival_date)
    if (arrival >= cutoff)
      return true;
    else
      return false;
  };

  this.canReactivate = function(order) {
    if (order.active)
      return false;

    var cutoff = new Date();
    cutoff.setDate(cutoff.getDate() + DataService.timeSpentSendingDelivery())
    var arrival = new Date(order.arrival_date)
    if (arrival >= cutoff)
      return true;
    else
      return false;
  };

  this.toggleOrderCanceled = function(order) {
    var thisCopy = this;
    DataService.toggleOrderActivation(order.id).then(function() {
      thisCopy.initFromData();
    }); 
  }

};

angular.module('logisticsApp.controllers')
  .controller('OrderCtrl', OrderCtrl);