'use strict';

function InventoryFormCtrl($route, $routeParams, $location, DataService) {

  this.form = { 'item': {},
                  'maxDate': new Date() };
  this.misc = { 'providers': [] };
  this.header = "New Phone";
  
  this.initFromData = function() {
    
    // get by inventory_id, not database record id
    this.invId = parseInt($routeParams.invIndex, 10);
    
    var myMisc = this.misc;
    DataService.getTelcos().then(function(providers) {
      myMisc.misc = { 'providers': providers };
    });
    this.misc = myMisc;

    if (this.invId) { // if editing
      var thisCopy = this;
      this.other = DataService.getItem(this.invId).then(function(item) {
        thisCopy.form.item = item;
        thisCopy.header = "Update Phone";
        var d = Date.parse(thisCopy.form.item.last_imaged);
        thisCopy.form.item.last_imaged = new Date(d);

        console.log(thisCopy.form.item.provider);
      });
      this.form = thisCopy.form;
      this.header = thisCopy.header;
    }
  };
  this.initFromData();

  this.submitEdit = function(item, event) {
    DataService.updateInventory(this.invId, this.form.item).then(
      function(output) {
        $location.path('inventory/' + this.invId);
      }, 
      function() {
        console.log('error updating inventory');
      });
  };

  this.submitNew = function() {
    DataService.createInventory(this.form.item).then(function(newObj) {
      $location.path('inventory/' + newObj.inventory_id);
    }, 
      function() {
        console.log('error adding inventory');
      });
  }
  
};

angular.module('logisticsApp.controllers')
.controller('InventoryFormCtrl', InventoryFormCtrl);
