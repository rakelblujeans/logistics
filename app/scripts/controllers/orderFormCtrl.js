'use strict';

angular.module('logisticsApp.controllers')
  .controller('OrderFormCtrl', ['$scope', '$route', '$routeParams', '$location', 'DataService', 
    function ($scope, $route, $routeParams, $location, DataService) {

    $scope.form = {};
    $scope.orderId = parseInt($routeParams.orderIndex, 10);

    $scope.initFromData = function() {
      $scope.other = DataService.getOrder($scope.orderId).then(function(order) {
        $scope.form = { 'order': order };
      });
    };
    $scope.$on('$viewContentLoaded', $scope.initFromData);

    $scope.submitTheForm = function(item, event) {
      console.log('--> Submitting form', $scope.form.order);
      //submit the data to the server
      //$scope.form...
    };

}]);
