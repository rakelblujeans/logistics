'use strict';

angular.module('logisticsApp.controllers')
  .controller('InventoryFormCtrl', ['$scope', '$route', '$routeParams', '$location', 'DataService', 
    function ($scope, $route, $routeParams, $location, DataService) {

    $scope.form = { 'item': {} };
    $scope.header = "New Inventory Item";
    
    $scope.initFromData = function() {
      $scope.invId = parseInt($routeParams.invIndex, 10);
      if ($scope.invId) { // if editing
        $scope.other = DataService.getItem($scope.invId).then(function(item) {
          $scope.form = { 'item': item };
          $scope.header = "Update Inventory Item #" + item.id;
          var d = Date.parse($scope.form.item.last_imaged);
          $scope.form.item.last_imaged = new Date(d);

          DataService.getTelcoName(item.provider_id).then(function(telcoName){
            $scope.form.item['providerName'] = telcoName;
          
            /*DataService.getOrdersByPhone(item.id).then(function(orders) {
              $scope.orders = orders;
            });*/
          });
        });
      }
    };
    $scope.$on('$viewContentLoaded', $scope.initFromData);

    $scope.submitEdit = function(item, event) {
      //console.log('--> Submitting form', $scope.form.item);
      DataService.updateInventory($scope.invId, $scope.form.item).then(function(output) {
        $location.path('inventory/' + $scope.invId);
      });
    };

    $scope.submitNew = function() {
      DataService.createInventory($scope.form.item).then(function(newObj) {
        $location.path('inventory/' + newObj.id);
      });
    };

}]);
