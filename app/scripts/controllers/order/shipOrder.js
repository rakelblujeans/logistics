'use strict';

function ShipOrderCtrl($scope, $location, $route, $routeParams, DataService, $timeout) {
  
  $scope.form = { 'shipment': {} };
  $scope.data = {
    unshippedPhones: [],
    selection: [],
    shipmentPhoneIds: {},
    doneShipping: false
  };

  function updateOrderData(orderId) {
    DataService.getOrder(orderId).then(function(order) {

      if (!order.is_verified) {
        $location.path("/orders").search({ 'verifiedState': '0' });
      }

      $scope.order = order;

      // get phones assigned to this order
      $scope.data.unshippedPhones = order.phones;
      for(var i=0; i<order.phones.length; i++) {
        $scope.data.selection[i] = order.phones[i].id;
      }

      // Build a list of which phones went out in each prior delivery.
      var numPhones = 0;
      for(var j=0; j<order.shipments.length; j++) {
        var phoneIds = [];
        
        for(var k=0; k<order.shipments[j].phones.length; k++) {
          phoneIds[k] = order.shipments[j].phones[k].id;

          // filter out phones that have already shipped - don't send this
          // info to the view
          var foundIdx = $scope.data.selection.indexOf(phoneIds[k])
          if (foundIdx > -1) {
            $scope.data.selection.splice(foundIdx, 1);
            $scope.data.unshippedPhones.splice(foundIdx, 1);
          }
        }
        $scope.data.shipmentPhoneIds[order.shipments[j].id] = '[' + phoneIds.join(',') + ']';
        numPhones += order.shipments[j].qty;
      }

      if (numPhones >= order.num_phones) {
        $scope.data.doneShipping = true;
      }

    });
  }

  $scope.initFromData = function() {
    var orderId = parseInt($routeParams.id, 10);
    if (orderId) {
      updateOrderData(orderId);
    }
  };
  $scope.initFromData();

  // toggle selection for a given phone by name
  $scope.toggleSelection = function(phoneId) {
    var idx = $scope.data.selection.indexOf(phoneId);

    // is currently selected
    if (idx > -1) {
      $scope.data.selection.splice(idx, 1);
    }
    // is newly selected
    else {
      $scope.data.selection.push(phoneId);
    }
  };

  $scope.shouldDisableForm = function(formIsValid) {
    var formData = $scope.form.shipment;
    // one of the two must be filled out
    if (!formData.delivery_out_code && !formData.hand_delivered_by) {
      return true;
    }

    if ($scope.data.selection.length <= 0) {
      return true;
    }

    return !formIsValid;
  };

  $scope.ship = function() {
    $scope.form.shipment['phone_ids'] = $scope.data.selection;
    $scope.form.shipment['order_id'] = $scope.order.id;
    $scope.form.shipment['out_on_date'] = new Date().toISOString();

    DataService.createShipment($scope.form).then(function(new_shipment) {
      updateOrderData($scope.order.id);
    });
  };

};

angular.module('logisticsApp.controllers')
  .controller('ShipOrderCtrl', ShipOrderCtrl);