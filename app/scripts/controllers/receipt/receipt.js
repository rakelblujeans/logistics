'use strict';

function ReceiptCtrl($scope, $http, $window, $route, $routeParams, DataService) {
    
  ListCtrl.call(this, $scope);
  
  $scope.initFromData = function() {
    $scope.receiptId = parseInt($routeParams.receiptIndex, 10);
    if ($scope.receiptId) { // detail view
      DataService.getReceipt($scope.receiptId).then(function(receipt) {
        $scope.receipt = receipt;
      });
    } else { // list view
      DataService.getReceipts().then(function(data) {
        $scope.receipts = data;
      });  
    }
   };
  $scope.$on('$viewContentLoaded', $scope.initFromData);
}

ReceiptCtrl.prototype.toggleActivation = function(index) {
  DataService.setActive('receipts', $scope.receipts[index].id, 
    !$scope.receipts[index].active).then(function(success){
    if (success) {
      $scope.receipts[index].active = !$scope.receipts[index].active;
    }
  });
};

angular.module('logisticsApp.controllers')
.controller('ReceiptCtrl', ReceiptCtrl);
