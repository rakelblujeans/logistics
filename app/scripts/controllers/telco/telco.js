'use strict';

function TelcoCtrl($scope, $http, $window, $route, $routeParams, DataService) {
    
  ListCtrl.call(this, $scope);
  
  $scope.initFromData = function() {
    $scope.telcoId = parseInt($routeParams.telcoIndex, 10);
    if ($scope.telcoId) { // detail view
      DataService.getTelco($scope.telcoId).then(function(telco) {
        $scope.telco = telco;
      });
    } else { // list view
      DataService.getTelcos().then(function(data) {
        $scope.telcos = data;
      });  
    }
   };
  $scope.$on('$viewContentLoaded', $scope.initFromData);
}

TelcoCtrl.prototype.toggleActivation = function(index) {
  DataService.setActive('telcos', $scope.telcos[index].id, 
    !$scope.telcos[index].active).then(function(success){
    if (success) {
      $scope.telcos[index].active = !$scope.telcos[index].active;
    }
  });
};

angular.module('logisticsApp.controllers')
.controller('TelcoCtrl', TelcoCtrl);
