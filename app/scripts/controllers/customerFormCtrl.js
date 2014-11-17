'use strict';

angular.module('logisticsApp.controllers')
  .controller('CustomerFormCtrl', ['$scope', '$route', '$routeParams', '$location', 'DataService', 
    function ($scope, $route, $routeParams, $location, DataService) {

    $scope.form = {};
    $scope.custId = parseInt($routeParams.custIndex, 10);

    $scope.initFromData = function() {
      $scope.other = DataService.getCustomer($scope.custId).then(function(customer) {
        $scope.form = { 'cust': customer };


      });
    };
    $scope.$on('$viewContentLoaded', $scope.initFromData);

    $scope.submitTheForm = function(item, event) {
      console.log('--> Submitting form', $scope.form.cust);
      DataService.postCustomer($scope.custId, $scope.form.cust);
      // TODO: add spinner until confirmed saved
      $location.path('customers/' + $scope.custId);
    };

}]);
