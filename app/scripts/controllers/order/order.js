 'use strict';

function OrderCtrl($scope, $route, $routeParams, DataService, $timeout) {

  ListCtrl.call(this, $scope, DataService);

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
  $scope.data = {};
  $scope.options = {}; // holds routeParam options
  
  function buildPhoneIdString(order) {
    var assignedPhones = [];
    for(var i=0; i<order.phones.length; i++) {
      if (order.phones[i]) {
        // always display by human-readable "inventory_id", not database id
        assignedPhones[assignedPhones.length] = order.phones[i].inventory_id;
      }
    }
    return "[" + assignedPhones.join(",") + "]"
  };

  function setPageTitle(options) {
    if (options.unverified) {
      $scope.data.pageTitle = "Pending orders";
    } else if (options.unshipped) {
      $scope.data.pageTitle = "Orders ready for delivery"
    } else {
      $scope.data.pageTitle = "All Orders";
    }
  };

  function _dismissModal() {
    // modal css clean up (bug in bootstrap related to fade-in)
    $('#myModal').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  };

  function _getAvailableInventory(order) {
    var orderData = $scope.data[order.id];
    orderData.phoneSlots = order.phones;

    orderData.assignedPhoneIds = buildPhoneIdString(order);

    var promise = DataService.getInventoryAvailability(order.arrival_date, order.departure_date).then(function(data) {
      orderData.availableInventory = data;
      orderData.slotsAvailable = 0;
      for (var i=0; i<order.num_phones; i++) {
        if (order.phones[i] === undefined) {
          orderData.slotsAvailable++;
        }
      }

      $scope.data[order.id] = orderData;
    });

    return promise;
  };

  function _updateOrder(oldOrder, newOrder) {
    if ($scope.order) { 
      $scope.order = newOrder;
    } else {
      oldOrder = newOrder;
      for(var i=0; i<$scope.orders.length; i++) {
        if ($scope.orders[i].id === newOrder.id) {
          $scope.orders[i].phones = newOrder.phones;
        }
      }
    }
  };

  $scope.initFromData = function() {
    $scope.sort.column = 'arrival_date'

    if ($routeParams.verifiedState) {
      $scope.options = {
        unverified: $routeParams.verifiedState == false,
        unshipped: $routeParams.verifiedState == true };
    }
    setPageTitle($scope.options);
    var orderId = parseInt($routeParams.id, 10);

    if (orderId) { // detail view
      DataService.getOrder(orderId).then(function(order) {
        $scope.order = order;
          $scope.data[order.id] = {};
          _getAvailableInventory($scope.order);
      });
    } else { // list view
      DataService.getOrders($scope.options).then(function(data) {
        $scope.orders = data;
        for (var i=0; i<$scope.orders.length; i++) {
          var id = $scope.orders[i].id;
          $scope.data[id] = {
              'assignedPhoneIds': buildPhoneIdString($scope.orders[i]),
              'assignmentOptionsVisible': false
          };
        }
      });
    }
  };
  $scope.initFromData();
  
  $scope.showInventoryOptions = function(order) {
    if ($scope.order) {
      _getAvailableInventory(order);
    } else {
      // collapse all other rows
      for(var i=0; i<$scope.orders.length; i++) {
        $scope.data[order.id].assignmentOptionsVisible = false;  
      }
      // only expand this order's row
      $scope.data[order.id].assignmentOptionsVisible = !$scope.data[order.id].assignmentOptionsVisible;
      // pull latest inventory data
      _getAvailableInventory(order);
    }
  };

  // WARNING: be careful to refer to phone by id, not inventory_id field
  $scope.assignDevice = function(order) {
    DataService.assignDevice(order.id, order.assignedInventoryItem).then(
      function(updatedOrder) {
        // refresh order with latest confirmed info from the server
        _updateOrder(order, updatedOrder);
        $scope.data[order.id].slotsAvailable--;
        _getAvailableInventory(updatedOrder);
    });
  };

  // WARNING: be careful to refer to phone by id, not inventory_id field
  $scope.unassignDevice = function(order, phoneId) {
    DataService.unassignDevice(order.id, phoneId).then(function(updatedOrder) {
      // refresh order with latest confirmed info from the server
      _updateOrder(order, updatedOrder);
      $scope.data[order.id].slotsAvailable++;
      _getAvailableInventory(updatedOrder);
    });
  };

  $scope.verifyOrder = function(order) {
    _dismissModal();

    DataService.markVerified(order.id).then(function() {
      delete $scope.data[order.id];

      if ($scope.orders) { // if on list page
        for(var i=0; i<$scope.orders.length; i++) {
          if ($scope.orders[i].id === order.id) {
            $scope.orders.splice(i, 1);
          }
        }
      } else { // if on detail page
        $scope.order.is_verified = true;
      }
    });
  }

  $scope.dismiss = function(order) {
    _dismissModal();
    // only need to update the phone list if 
    // we are on the detail page
    if ($scope.order) {
      _getAvailableInventory(order);
    }
  };

  $scope.togglePhoneActivation = function(item) {
    DataService.togglePhoneActivation(item.id).then(function(phone){
      $scope.initFromData();
    });
  };

  $scope.isCancelable = function(order) {
    if (!order.active)
      return false;

    var cutoff = new Date();
    cutoff.setDate(cutoff.getDate() + 3)
    var arrival = new Date(order.arrival_date)
    if (arrival >= cutoff)
      return true;
    else
      return false;
  };

  $scope.canReactivate = function(order) {
    if (order.active)
      return false;

    var cutoff = new Date();
    cutoff.setDate(cutoff.getDate() + 3)
    var arrival = new Date(order.arrival_date)
    if (arrival >= cutoff)
      return true;
    else
      return false;
  };

  $scope.toggleOrderCanceled = function(order) {
    DataService.toggleOrderActivation(order.id).then(function() {
      $scope.initFromData();
    }); 
  }

};

OrderCtrl.prototype = Object.create(ListCtrl.prototype);

angular.module('logisticsApp.controllers')
  .controller('OrderCtrl', OrderCtrl);