'use strict';

angular.module('logisticsApp.controllers')
  .controller('InventoryFormCtrl', ['$scope', '$route', '$routeParams', '$location', 'DataService', 
    function ($scope, $route, $routeParams, $location, DataService) {

    $scope.form = { 'item': {},
                    'maxDate': new Date() };
    $scope.misc = { 'providers': [] };
    $scope.header = "New Phone";
    
    $scope.initFromData = function() {
      
      // get by inventory_id, not database record id
      $scope.invId = parseInt($routeParams.invIndex, 10);
      
      DataService.getTelcos().then(function(providers) {
        $scope.misc = { 'providers': providers };
      });

      if ($scope.invId) { // if editing
        $scope.other = DataService.getItem($scope.invId).then(function(item) {
          $scope.form.item = item;
          $scope.header = "Update Phone";
          var d = Date.parse($scope.form.item.last_imaged);
          $scope.form.item.last_imaged = new Date(d);

          console.log($scope.form.item.provider);
        });
      }
    };
    $scope.initFromData();

    $scope.submitEdit = function(item, event) {
      DataService.updateInventory($scope.invId, $scope.form.item).then(
        function(output) {
          $location.path('inventory/' + $scope.invId);
        }, 
        function() {
          console.log('error updating inventory');
        });
    };

    $scope.submitNew = function() {
      DataService.createInventory($scope.form.item).then(function(newObj) {
        $location.path('inventory/' + newObj.inventory_id);
      }, 
        function() {
          console.log('error adding inventory');
        });
    };

}]);
