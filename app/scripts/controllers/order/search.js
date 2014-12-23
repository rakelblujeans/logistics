 'use strict';

function SearchCtrl($scope, $route, $routeParams, DataService, $timeout) {

  ListCtrl.call(this, $scope, DataService);

  $scope.data = {};
  $scope.options = {}; // holds routeParam options
};

SearchCtrl.prototype = Object.create(ListCtrl.prototype);

angular.module('logisticsApp.controllers')
  .controller('SearchCtrl', SearchCtrl);