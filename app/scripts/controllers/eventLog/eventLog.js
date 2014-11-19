'use strict';

function EventLogCtrl($scope, $http, $window, $route, $routeParams, DataService) {
    
    ListCtrl.call(this, $scope);

    $scope.initFromData = function() {
      $scope.logId = parseInt($routeParams.logIndex, 10);
      if ($scope.logId) { // detail view
        DataService.getEventLog($scope.logId).then(function(eventLog) {
          $scope.log = eventLog;
        });
      } else { // list view
        $scope.other = DataService.getEventLogs().then(function(data) {
          $scope.eventLogs = data;
        });  
      }
   		
	  };
    $scope.$on('$viewContentLoaded', $scope.initFromData);
};

EventLogCtrl.prototype.toggleActivation = function(index) {
  DataService.setActive('eventLogs', $scope.eventLogs[index].id, 
    !$scope.eventLogs[index].active).then(function(success){
    if (success) {
      $scope.eventLogs[index].active = !$scope.eventLogs[index].active;
    }
  });
};

angular.module('logisticsApp.controllers')
.controller('EventLogCtrl', EventLogCtrl);
