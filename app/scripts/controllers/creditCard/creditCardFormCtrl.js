'use strict';

function CreditCardFormCtrl($scope, $route, $routeParams, $location, DataService) {

  $scope.form = { 'card': {} };
  $scope.header = 'New Credit Card';

  $scope.initFromData = function() {
    $scope.cardId = parseInt($routeParams.cardIndex, 10);
    if ($scope.cardId) { // if editing
      DataService.getCreditCard($scope.cardId).then(function(card) {
        $scope.form = { 'card': card };
        $scope.header = 'Update card #' + card.id;
      });
    }
  };
  $scope.$on('$viewContentLoaded', $scope.initFromData);

  $scope.submitEdit = function() {
    DataService.updateCreditCard($scope.cardId, $scope.form.card).then(function() {
      $location.path('creditCards/' + $scope.cardId);
    });
    // TODO: add spinner until confirmed saved
  };

  $scope.submitNew = function() {
    DataService.createCreditCard($scope.form.card).then(function(newData) {
      // TODO: handle errors
      $location.path('creditCards/' + newData.id);
    });
  };

};

angular.module('logisticsApp.controllers')
  .controller('CreditCardFormCtrl', CreditCardFormCtrl);