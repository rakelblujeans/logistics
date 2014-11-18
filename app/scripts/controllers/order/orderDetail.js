'use strict';

angular.module('logisticsApp.controllers')
  .controller('OrderDetailCtrl', ['$scope', '$http', '$window', '$route', '$routeParams', '$location', 'DataService', 
  	function ($scope, $http, $window, $route, $routeParams, $location, DataService) {

  	$scope.orderId = parseInt($routeParams.orderIndex, 10);

    $scope.initFromData = function() {
      $scope.other = DataService.getOrder($scope.orderId).then(function(order) {
        $scope.order = order;

      });
    };
    $scope.$on('$viewContentLoaded', $scope.initFromData);

}]);
