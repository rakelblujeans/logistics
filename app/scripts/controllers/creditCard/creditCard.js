'use strict';

//angular.module('logisticsApp.controllers')
//  .controller('CreditCardCtrl', ['$scope', '$http', '$window', 'DataService', 
function CreditCardCtrl($scope, $http, $window, $route, $routeParams, DataService) {
    
  ListCtrl.call(this, $scope);

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

CreditCardCtrl.prototype.toggleActivation = function(index) {
  DataService.setActive('credit_card', $scope.creditCards[index].id, 
    !$scope.creditCards[index].active).then(function(success){
    if (success) {
      $scope.creditCards[index].active = !$scope.creditCards[index].active;
    }
  });
};

angular.module('logisticsApp.controllers')
.controller('CreditCardCtrl', CreditCardCtrl);

//  }]);
