'use strict';

function ReceiptCtrl($scope, $http, $window, $route, $routeParams, DataService, CommonCode) {
  
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

angular.module('logisticsApp.controllers')
.controller('ReceiptCtrl', ReceiptCtrl);
