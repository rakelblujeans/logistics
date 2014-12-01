'use strict';

function CreditCardCtrl($scope, $http, $window, $route, $routeParams, DataService) {
    
  ListCtrl.call(this, $scope, DataService);

  $scope.initFromData = function() {
    $scope.cardId = parseInt($routeParams.cardIndex, 10);
    if ($scope.cardId) { // detail view
      DataService.getCreditCard($scope.cardId).then(function(card) {
        $scope.card = card;
      });
    } else { // list view
      $scope.other = DataService.getCreditCards().then(function(data) {
        $scope.creditCards = data;
      });  
    }
 		
  };
  $scope.$on('$viewContentLoaded', $scope.initFromData);
};

CreditCardCtrl.prototype = Object.create(ListCtrl.prototype);

angular.module('logisticsApp.controllers')
.controller('CreditCardCtrl', CreditCardCtrl);
