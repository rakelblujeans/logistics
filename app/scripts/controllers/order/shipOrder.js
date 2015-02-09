'use strict';

function ShipOrderCtrl($location, $route, $routeParams, DataService, $timeout, CommonCode) {
  
  this.form = { 'shipment': {} };
  this.data = {
    unshippedPhones: [],
    selection: [],
    shipmentPhoneIds: {},
    doneShipping: false
  };

  this.updateOrderData = function(orderId) {
    var thisCopy = this;
    DataService.getOrder(orderId).then(function(order) {

      if (!order.is_verified) {
        $location.path("/orders").search({ 'verifiedState': '0' });
      }

      order.arrival_date_display = CommonCode.getFormattedDate(order.arrival_date);
      order.departure_date_display = CommonCode.getFormattedDate(order.departure_date);
      for (var z=0; z<order.shipments.length; z++) {
        order.shipments[z].out_on_date_display = CommonCode.getFormattedDate(order.shipments[z].out_on_date);
      }
      thisCopy.order = order;


      // get phones assigned to this order
      thisCopy.data.unshippedPhones = order.phones;
      for(var i=0; i<order.phones.length; i++) {
        thisCopy.data.selection[i] = order.phones[i].id;
      }

      // Build a list of which phones went out in each prior delivery.
      var numPhones = 0;
      for(var j=0; j<order.shipments.length; j++) {
        var phoneIds = [];
        
        for(var k=0; k<order.shipments[j].phones.length; k++) {
          phoneIds[k] = order.shipments[j].phones[k].id;

          // filter out phones that have already shipped - don't send this
          // info to the view
          var foundIdx = thisCopy.data.selection.indexOf(phoneIds[k])
          if (foundIdx > -1) {
            thisCopy.data.selection.splice(foundIdx, 1);
            thisCopy.data.unshippedPhones.splice(foundIdx, 1);
          }
        }
        thisCopy.data.shipmentPhoneIds[order.shipments[j].id] = '[' + phoneIds.join(',') + ']';
        numPhones += order.shipments[j].qty;
      }

      if (numPhones >= order.num_phones) {
        thisCopy.data.doneShipping = true;
      }

    });
    this.data = thisCopy.data;
    this.order = thisCopy.order;

  }

  this.initFromData = function() {
    var orderId = parseInt($routeParams.id, 10);
    if (orderId) {
      this.updateOrderData(orderId);
    }
  };
  this.initFromData();

  // toggle selection for a given phone by name
  this.toggleSelection = function(phoneId) {
    var idx = this.data.selection.indexOf(phoneId);

    // is currently selected
    if (idx > -1) {
      this.data.selection.splice(idx, 1);
    }
    // is newly selected
    else {
      this.data.selection.push(phoneId);
    }
  };

  this.shouldDisableForm = function(formIsValid) {
    var formData = this.form.shipment;
    // one of the two must be filled out
    if (!formData.delivery_out_code && !formData.hand_delivered_by) {
      return true;
    }

    if (this.data.selection.length <= 0) {
      return true;
    }

    return !formIsValid;
  };

  this.ship = function() {
    this.form.shipment['phone_ids'] = this.data.selection;
    this.form.shipment['order_id'] = this.order.id;
    this.form.shipment['out_on_date'] = new Date().toISOString();
    var thisCopy = this;
    DataService.createShipment(thisCopy.form).then(function(new_shipment) {
      thisCopy.updateOrderData(thisCopy.order.id);
    });
  };

};

angular.module('logisticsApp.controllers')
  .controller('ShipOrderCtrl', ShipOrderCtrl);