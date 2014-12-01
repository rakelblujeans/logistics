'use strict';

function EventLogCtrl($scope, $http, $window, $route, $routeParams, DataService) {
    
    ListCtrl.call(this, $scope, DataService);

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

EventLogCtrl.prototype = Object.create(ListCtrl.prototype);

angular.module('logisticsApp.controllers')
.controller('EventLogCtrl', EventLogCtrl);
