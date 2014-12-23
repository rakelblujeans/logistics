 'use strict';

function OrderOutCtrl($scope, $route, $routeParams, DataService, $timeout) {

  ListCtrl.call(this, $scope, DataService);
  $scope.data = {};
  
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

  $scope.initFromData = function() {
    $scope.sort.column = 'inventory_id'

    DataService.getOrdersOut().then(function(data) {
      $scope.orders = data;
    });
  };
  $scope.initFromData();

};

OrderOutCtrl.prototype = Object.create(ListCtrl.prototype);

angular.module('logisticsApp.controllers')
  .controller('OrderOutCtrl', OrderOutCtrl);