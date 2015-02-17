  'use strict';

function ShipOrderCtrl($location, $route, $routeParams, $timeout, ShipmentService, OrderService, CommonCode) {
  
  this.form = { 'shipment': {} };
  this.data = {
    unshippedPhones: [],
    selection: [],
    shipmentPhoneIds: {},
    doneShipping: false
  };
  //this.order = undefined;

  this.updateOrderData = function(orderId) {
    OrderService.get(orderId).then(function(order) {
      this.order = order;
      
      if (!order.is_verified) {
        $location.path("/orders").search({ 'verifiedState': '0' });
        return;
      }
      
      order.arrival_date_display = CommonCode.getFormattedDate(order.arrival_date);
      order.departure_date_display = CommonCode.getFormattedDate(order.departure_date);
      for (var z=0; z<order.shipments.length; z++) {
        order.shipments[z].out_on_date_display = CommonCode.getFormattedDate(order.shipments[z].out_on_date);
      }

      // get phones assigned to this order
      this.data.unshippedPhones = order.phones;
      for(var i=0; i<order.phones.length; i++) {
        this.data.selection[i] = order.phones[i].id;
      }

      // Build a list of which phones went out in each prior delivery.
      var numPhones = 0;
      for(var j=0; j<order.shipments.length; j++) {
        var phoneIds = [];
        
        for(var k=0; k<order.shipments[j].phones.length; k++) {
          phoneIds[k] = order.shipments[j].phones[k].id;

          // filter out phones that have already shipped - don't send this
          // info to the view
          var foundIdx = this.data.selection.indexOf(phoneIds[k])
          if (foundIdx > -1) {
            this.data.selection.splice(foundIdx, 1);
            this.data.unshippedPhones.splice(foundIdx, 1);
          }
        }
        this.data.shipmentPhoneIds[order.shipments[j].id] = '[' + phoneIds.join(',') + ']';
        numPhones += order.shipments[j].qty;
      }

      if (numPhones >= order.num_phones) {
        this.data.doneShipping = true;
      }
    }.bind(this));
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
    ShipmentService.create(this.form).then(function(new_shipment) {
      this.updateOrderData(this.order.id);
    }.bind(this));
  };

};

ShipOrderCtrl.$inject = ['$location', '$route', '$routeParams', '$timeout', 'OrderService', 'ShipmentService', 'CommonCode'];

angular.module('logisticsApp.controllers')
  .controller('ShipOrderCtrl', ShipOrderCtrl);