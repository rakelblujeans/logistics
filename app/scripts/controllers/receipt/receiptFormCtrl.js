'use strict';

function ReceiptFormCtrl($scope, $route, $routeParams, $location, DataService) {

  $scope.form = { 'receipt': {} };
  $scope.header = 'New Receipt';

  $scope.initFromData = function() {
    $scope.receiptId = parseInt($routeParams.receiptIndex, 10);
    if ($scope.receiptId) { // if editing
      DataService.getReceipt($scope.receiptId).then(function(receipt) {

        receipt.rental_charge = parseFloat(receipt.rental_charge, 10);
        receipt.shipping_charge = parseFloat(receipt.shipping_charge, 10);
        receipt.rental_discount = parseFloat(receipt.rental_discount, 10);
        receipt.tax_charge = parseFloat(receipt.tax_charge, 10);
        receipt.payment_amount = parseFloat(receipt.payment_amount, 10);
        receipt.last_4_digits = parseFloat(receipt.last_4_digits, 10);

        $scope.form = { 'receipt': receipt };
        $scope.header = 'Update receipt #' + receipt.id;



      });
    }
  };
  $scope.$on('$viewContentLoaded', $scope.initFromData);

  $scope.submitEdit = function() {
    DataService.updateReceipt($scope.receiptId, $scope.form.receipt).then(function() {
      $location.path('receipts/' + $scope.receiptId);
    });
    // TODO: add spinner until confirmed saved
  };

  $scope.submitNew = function() {
    DataService.createReceipt($scope.form.receipt).then(function(newData) {
      // TODO: handle errors
      $location.path('receipts/' + newData.id);
    });
  };
}

angular.module('logisticsApp.controllers')
.controller('ReceiptFormCtrl', ReceiptFormCtrl);
