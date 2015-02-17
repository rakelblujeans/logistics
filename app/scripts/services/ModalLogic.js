'use strict';

angular.module('logisticsApp.services')
.factory('ModalLogic', ['InventoryService', function (InventoryService) {

	var root = {};

  root.updateDataFn = undefined;

  root.modalData = {
    phones: [],
    selection: []
  };

  root.receivedInventory = [];

  /*root.dismiss = function() {
    this.modal.order = undefined;
    // modal css clean up (bug in bootstrap related to fade-in)
    $('#myModal').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  };*/

  root.showCheckInModal = function(phones) {
    root.receivedInventory = [];
    root.modalData.phones = phones;
    for (var i=0; i<phones.length; i++) {
      root.modalData.selection.push(phones[i].id);
    }
  };

  // toggle selection for a given phone by name
  root.toggleSelection = function(phoneId) {
    var idx = root.modalData.selection.indexOf(phoneId);
    // is currently selected
    if (idx > -1) {
      root.modalData.selection.splice(idx, 1);
    } else { 
    // is newly selected
      root.modalData.selection.push(phoneId);
    }
  };

  root._processReceivedCallback = function(returnedPhones) {
    var returnedIds = [];
    for (var i=0; i<returnedPhones.length; i++) {
      returnedIds[i] = returnedPhones[i].id;
    }
    root.receivedInventory = returnedIds;
    $('#confirmationModal').modal('show');
  };

  root.markReceivedThroughModal = function() {
    root.receivedInventory = [];

    InventoryService.checkIn(root.modalData.selection).then(function(returnedPhones) {
      root._processReceivedCallback(returnedPhones);
      root.updateDataFn();
    }.bind(root));
  };

  return root;

}]);

