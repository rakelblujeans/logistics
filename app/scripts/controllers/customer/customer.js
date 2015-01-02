'use strict';

function CustomerCtrl($scope, $http, $window, $route, $routeParams, DataService) {
    
  ListCtrl.call(this, $scope, DataService);

  $scope.data = {
    customer: {},
    customers: {}
  };

  $scope.initFromData = function() {
    $scope.custId = parseInt($routeParams.custIndex, 10);
    if ($scope.custId) { // detail view
      DataService.getCustomer($scope.custId).then(function(customer) {
        $scope.data.customer = customer;
        //DataService.getCustomerCards(customer.id).then(function(cards){
        //  $scope.item['cards'] = cards;
        //});
      });
    } else { // list view
      DataService.getCustomers().then(function(data) {
        $scope.data.customers = data;
      });  
    }
 		
  };
  $scope.initFromData();
};

CustomerCtrl.prototype = Object.create(ListCtrl.prototype);

angular.module('logisticsApp.controllers')
.controller('CustomerCtrl', CustomerCtrl);
