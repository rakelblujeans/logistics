'use strict';

function EventCtrl($scope, $http, $window, $route, $routeParams, DataService) {
    
    ListCtrl.call(this, $scope, DataService);

    $scope.initFromData = function() {
      $scope.logId = parseInt($routeParams.logIndex, 10);
      if ($scope.logId) { // detail view
        DataService.getEvent($scope.logId).then(function(event) {
          $scope.log = event;
        });
      } else { // list view
        $scope.other = DataService.getEvents().then(function(data) {
          $scope.events = data;
        });  
      }
	  };
    $scope.$on('$viewContentLoaded', $scope.initFromData);
};

EventCtrl.prototype = Object.create(ListCtrl.prototype);

angular.module('logisticsApp.controllers')
.controller('EventCtrl', EventCtrl);
