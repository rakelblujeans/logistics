'use strict';

angular.module('logisticsApp.controllers')
  .controller('CustomerDetailCtrl', ['$scope', '$http', '$window', '$route', '$routeParams', 'DataService', 
  	function ($scope, $http, $window, $route, $routeParams, DataService) {
    
    $scope.custId = parseInt($routeParams.custIndex, 10);

    $scope.initFromData = function() {
      $scope.other = DataService.getCustomer($scope.custId).then(function(customer) {
        $scope.cust = customer;
        //DataService.getCustomerCards(customer.id).then(function(cards){
        //	$scope.item['cards'] = cards;
        //});
      });
    };
    $scope.$on('$viewContentLoaded', $scope.initFromData);

  }]);
