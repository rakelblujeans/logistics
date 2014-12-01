'use strict';

function ReceiptCtrl($scope, $http, $window, $route, $routeParams, DataService) {
  
  ListCtrl.call(this, $scope, DataService);
  
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

ReceiptCtrl.prototype = Object.create(ListCtrl.prototype);

angular.module('logisticsApp.controllers')
.controller('ReceiptCtrl', ReceiptCtrl);
