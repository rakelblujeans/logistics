'use strict';

angular.module('logisticsApp.controllers')
  .controller('OrderFormCtrl', ['$scope', '$route', '$routeParams', '$location', 'DataService', 
    function ($scope, $route, $routeParams, $location, DataService) {

    $scope.form = { 'order': {} };
    $scope.header = 'New Order';

    $scope.initFromData = function() {
      $scope.orderId = parseInt($routeParams.orderIndex, 10);
      if ($scope.orderId) { // if editing
        $scope.other = DataService.getOrder($scope.orderId).then(function(order) {
          $scope.form = { 'order': order };
          $scope.header = 'Update order #' + order.id;
        });
      }
    };
    $scope.$on('$viewContentLoaded', $scope.initFromData);

    $scope.submitEdit = function() {
      //console.log('--> Submitting form', $scope.form.order);
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
}]);
