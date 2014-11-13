'use strict';

angular.module('logisticsApp.controllers')
  .controller('InventoryFormCtrl', ['$scope', '$route', '$routeParams', '$location', 'DataService', 
    function ($scope, $route, $routeParams, $location, DataService) {

    $scope.form = {};
    $scope.invId = parseInt($routeParams.invIndex, 10);

    $scope.initFromData = function() {
      $scope.other = DataService.getItem($scope.invId).then(function(item) {
        $scope.form = { 'item': item };
        var d = Date.parse($scope.form.item.last_imaged);
        $scope.form.item.last_imaged = new Date(d);

        DataService.getTelcoName(item.provider_id).then(function(telcoName){
          $scope.form.item['providerName'] = telcoName;
        
          /*DataService.getOrdersByPhone(item.id).then(function(orders) {
            $scope.orders = orders;
          });*/
        });


      });
    };
    $scope.$on('$viewContentLoaded', $scope.initFromData);

    $scope.submitTheForm = function(item, event) {
      console.log('--> Submitting form', $scope.form.item);
      //submit the data to the server
      //$scope.form...

    };

}]);
