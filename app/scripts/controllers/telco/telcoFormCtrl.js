'use strict';

function TelcoFormCtrl($scope, $route, $routeParams, $location, DataService) {

  $scope.form = { 'telco': {} };
  $scope.header = 'New Telco';

  $scope.initFromData = function() {
    $scope.telcoId = parseInt($routeParams.telcoIndex, 10);
    if ($scope.telcoId) { // if editing
      DataService.getTelco($scope.telcoId).then(function(telco) {
        $scope.form = { 'telco': telco };
        $scope.header = 'Update telco #' + telco.id;
      });
    }
  };
  $scope.$on('$viewContentLoaded', $scope.initFromData);

  $scope.submitEdit = function() {
    DataService.updateTelco($scope.telcoId, $scope.form.telco).then(function() {
      $location.path('telcos/' + $scope.telcoId);
    });
    // TODO: add spinner until confirmed saved
  };

  $scope.submitNew = function() {
    DataService.createTelco($scope.form.telco).then(function(newData) {
      // TODO: handle errors
      $location.path('telcos/' + newData.id);
    });
  };
}

angular.module('logisticsApp.controllers')
.controller('TelcoFormCtrl', TelcoFormCtrl);
