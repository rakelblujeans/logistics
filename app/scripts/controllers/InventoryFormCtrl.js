'use strict';

angular.module('logisticsApp.controllers')
  .controller('InventoryFormCtrl', ['$scope', '$route', '$routeParams', '$location', 'DataService', 
    function ($scope, $route, $routeParams, $location, DataService) {

    $scope.form = {};
    $scope.invId = parseInt($routeParams.invIndex, 10);

    $scope.initFromData = function() {
      $scope.other = DataService.getItem($scope.invId).then(function(item) {
        $scope.form = { 'item': item };
        DataService.getTelcoName(item.provider_id).then(function(telcoName){
          $scope.form['providerName'] = telcoName;
        
          /*DataService.getOrdersByPhone(item.id).then(function(orders) {
            $scope.orders = orders;
          });*/
        });

        $scope.form.item.MEID = parseInt($scope.form.MEID, 10);
        $scope.form.item.ICCID = parseInt($scope.form.ICCID, 10);


      });
    };
    $scope.$on('$viewContentLoaded', $scope.initFromData);

    /*this.submit = function(isValid, data) {
      console.log('submitted', data);
      if(!isValid) { return; }

      //submit the data to the server
      //$http.post('/api/submit', data);
    };*/

    $scope.submitTheForm = function(item, event) {
      console.log('--> Submitting form');

    };

}]);
