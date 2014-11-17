'use strict';

angular.module('logisticsApp.controllers')
  .controller('CustomerFormCtrl', ['$scope', '$route', '$routeParams', '$location', 'DataService', 
    function ($scope, $route, $routeParams, $location, DataService) {

    $scope.form = {};
    $scope.custId = parseInt($routeParams.custIndex, 10);

    $scope.initFromData2 = function() {
      $scope.other = DataService.getCustomer($scope.custId).then(function(customer) {
        $scope.form = { 'cust': customer };
      });
    };
    $scope.$on('$viewContentLoaded', $scope.initFromData2);

    $scope.submitTheForm = function(item, event) {
      console.log('--> Submitting form', $scope.form.cust);
      //submit the data to the server
      //$scope.form...
    };

}]);
