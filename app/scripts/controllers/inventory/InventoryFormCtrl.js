'use strict';

angular.module('logisticsApp.controllers')
  .controller('InventoryFormCtrl', ['$scope', '$route', '$routeParams', '$location', 'DataService', 
    function ($scope, $route, $routeParams, $location, DataService) {

    $scope.form = { 'item': {},
                    'maxDate': new Date() };
    $scope.misc = { 'providers': [] };
    $scope.header = "New Inventory Item";
    
    $scope.initFromData = function() {
      
      $scope.invId = parseInt($routeParams.invIndex, 10);
      
      DataService.getAll('providers').then(function(providers) {
        $scope.misc = { 'providers': providers };
      });

      if ($scope.invId) { // if editing
        $scope.other = DataService.getItem($scope.invId).then(function(item) {
          $scope.form.item = item;
          $scope.header = "Update Inventory Item #" + item.id;
          var d = Date.parse($scope.form.item.last_imaged);
          $scope.form.item.last_imaged = new Date(d);

          if (item.provider_id) {
            DataService.getTelcoName(item.provider_id).then(function(telcoName){
              $scope.form.item['providerName'] = telcoName;
            });
          }

        });
      }
    };
    $scope.$on('$viewContentLoaded', $scope.initFromData);

    $scope.submitEdit = function(item, event) {
      console.log('--> Submitting form', $scope.form.item);
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
        $location.path('inventory/' + newObj.id);
      }, 
        function() {
          console.log('error adding inventory');
        });
    };

}]);
