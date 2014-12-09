'use strict';

function ShipOrderCtrl($scope, $route, $routeParams, DataService, $timeout) {
  
  $scope.form = { 'shipment': {} };
    $scope.data = {
      selection: [],
      shipmentPhoneIds: {},
      doneShipping: false
    };

  $scope.initFromData = function() {
    var orderId = parseInt($routeParams.id, 10);
    if (orderId) {
      DataService.getOrder(orderId).then(function(order) {
        $scope.order = order;
        // display a list of unshipped phones the user can choose from
        for(var i=0; i<order.phones.length; i++) {
          $scope.data.selection[i] = order.phones[i].id;
        }

        // build a list of which phones went out in each prior delivery.
        // this is stricly for use in the view.

        for(var j=0; j<order.shipments.length; j++) {
          var phoneIds = [];
          
          for(var k=0; k<order.shipments[j].phones.length; k++) {
            phoneIds[k] = order.shipments[j].phones[k].id;
          }
          $scope.data.shipmentPhoneIds[order.shipments[j].id] = '[' + phoneIds.join(',') + ']';

        }
      });
    }
  };
  $scope.$on('$viewContentLoaded', $scope.initFromData);

  // toggle selection for a given fruit by name
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
    //console.log($scope.form.shipment);
    var formData = $scope.form.shipment;
    // one of the two must be filled out
    if (!formData.delivery_out_code && !formData.hand_delivered_by) {
      return true;
    }

    return !formIsValid;
  };

  $scope.ship = function() {
    //console.log($scope.form.shipment);
    $scope.form.shipment['phone_ids'] = $scope.data.selection;
    $scope.form.shipment['order_id'] = $scope.order.id;
    $scope.form.shipment['out_on_date'] = new Date().toISOString();

    DataService.createShipment($scope.form).then(function(new_shipment) {
      //console.log("received: ", new_shipment);
      $scope.data.pastShipments[$scope.data.pastShipments.length] = new_shipment;
    });
  };

};

angular.module('logisticsApp.controllers')
  .controller('ShipOrderCtrl', ShipOrderCtrl);