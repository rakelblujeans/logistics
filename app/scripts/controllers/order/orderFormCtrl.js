'use strict';

function OrderFormCtrl($scope, $route, $routeParams, $location, DataService) {

  $scope.form = { 'order': {} };
  $scope.header = 'New Order';
  
  $scope.initFromData = function() {
    $scope.orderId = $routeParams.id;
    if ($scope.orderId) { // if editing
      DataService.getOrder($scope.orderId).then(function(order) {
        $scope.form = { 'order': order };
        $scope.header = 'Update order #' + order.id;
      });
    }
  };
  $scope.initFromData();

  $scope.submitEdit = function() {
    DataService.updateOrder($scope.orderId, $scope.form.order).then(function() {
      $location.path('orders/' + $scope.orderId);
    });
    // TODO: add spinner until confirmed saved
  };

  $scope.submitNew = function() {
    DataService.createOrder($scope.form.order).then(function(newData) {
      // TODO: handle errors
      $location.path('orders/' + newData.id);
    });
  };

};

angular.module('logisticsApp.controllers')
.controller('OrderFormCtrl', OrderFormCtrl);
