'use strict';

function EventFormCtrl($scope, $route, $routeParams, $location, DataService) {

  $scope.form = { 'log': {} };
  $scope.header = 'New Event Log';

  $scope.initFromData = function() {
    $scope.logId = parseInt($routeParams.logIndex, 10);
    if ($scope.logId) { // if editing
      DataService.getEvent($scope.logId).then(function(log) {
        $scope.form = { 'log': log };
        $scope.header = 'Update event log #' + log.id;
      });
    }
  };
  $scope.$on('$viewContentLoaded', $scope.initFromData);

  $scope.submitEdit = function() {
    DataService.updateEvent($scope.logId, $scope.form.log).then(function() {
      $location.path('events/' + $scope.logId);
    });
    // TODO: add spinner until confirmed saved
  };

  $scope.submitNew = function() {
    DataService.createEvent($scope.form.log).then(function(newData) {
      // TODO: handle errors
      $location.path('events/' + newData.id);
    });
  };

};

angular.module('logisticsApp.controllers')
  .controller('EventFormCtrl', EventFormCtrl);