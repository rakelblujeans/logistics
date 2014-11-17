'use strict';

angular.module('logisticsApp.controllers')
  .controller('InventoryDetailCtrl', ['$scope', '$http', '$window', '$route', '$routeParams', '$location', 'DataService', 
  	function ($scope, $http, $window, $route, $routeParams, $location, DataService) {

  	$scope.invId = parseInt($routeParams.invIndex, 10);

    $scope.initFromData = function() {
      $scope.other = DataService.getItem($scope.invId).then(function(item) {
        $scope.item = item;
        DataService.getTelcoName(item.provider_id).then(function(telcoName){
        	$scope.item['providerName'] = telcoName;
        
        	/*DataService.getOrdersByPhone($scope.invId).then(function(orders) {
        		$scope.orders = orders;
            console.log('orders', orders)
        	});*/
        });

      });
    };
    $scope.$on('$viewContentLoaded', $scope.initFromData);

}]);
