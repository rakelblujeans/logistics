'use strict';

angular.module('logisticsApp.controllers')
  .controller('CustomerFormCtrl', ['$scope', '$route', '$routeParams', '$location', 'DataService', 
    function ($scope, $route, $routeParams, $location, DataService) {

    $scope.form = { 'cust': {} };
    $scope.header = "New Customer";   
 
    $scope.initFromData = function() {
      $scope.custId = parseInt($routeParams.custIndex, 10);
      if ($scope.custId) { // if editing

        $scope.other = DataService.getCustomer($scope.custId).then(function(customer) {
          $scope.form = { 'cust': customer };
          $scope.header = "Update Customer #" + customer.id;
        });
      }
    };
    $scope.$on('$viewContentLoaded', $scope.initFromData);

    // update existing object
    $scope.submitEdit = function(item, event) {
      //console.log('--> Submitting form', $scope.form.cust);
      DataService.postCustomer($scope.custId, $scope.form.cust);
      // TODO: add spinner until confirmed saved
      $location.path('customers/' + $scope.custId);
    };
    
    // create entirely new object
    $scope.submitNew = function() {
      DataService.createCustomer($scope.form.cust);
    };
}]);
