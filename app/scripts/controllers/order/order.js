'use strict';

function OrderCtrl($scope, $http, $window, $route, $routeParams, DataService) {
  ListCtrl.call(this, $scope);

  $scope.initFromData = function() {
    $scope.orderId = parseInt($routeParams.orderIndex, 10);
    if ($scope.orderId) { // detail view
      DataService.getOrder($scope.orderId).then(function(order) {
        $scope.order = order;
      });
    } else { // list view
      DataService.getOrders().then(function(data) {
        $scope.orders = data;
      });
    }
  };
  $scope.$on('$viewContentLoaded', $scope.initFromData);
};

OrderCtrl.prototype = Object.create(ListCtrl.prototype);

angular.module('logisticsApp.controllers')
  .controller('OrderCtrl', OrderCtrl);
