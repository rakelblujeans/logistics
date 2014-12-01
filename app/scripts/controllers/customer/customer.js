'use strict';

function CustomerCtrl($scope, $http, $window, $route, $routeParams, DataService) {
    
    ListCtrl.call(this, $scope, DataService);

    $scope.initFromData = function() {
      $scope.custId = parseInt($routeParams.custIndex, 10);
      if ($scope.custId) { // detail view
        DataService.getCustomer($scope.custId).then(function(customer) {
          $scope.cust = customer;
          //DataService.getCustomerCards(customer.id).then(function(cards){
          //  $scope.item['cards'] = cards;
          //});
        });
      } else { // list view
        $scope.other = DataService.getCustomers().then(function(data) {
          $scope.customers = data;
        });  
      }
   		
	  };
    $scope.$on('$viewContentLoaded', $scope.initFromData);
};

CustomerCtrl.prototype = Object.create(ListCtrl.prototype);

angular.module('logisticsApp.controllers')
.controller('CustomerCtrl', CustomerCtrl);
