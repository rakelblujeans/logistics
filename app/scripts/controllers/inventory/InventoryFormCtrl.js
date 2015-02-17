'use strict';

function InventoryFormCtrl($route, $routeParams, $location, InventoryService, TelcoService) {

  this.form = { 'item': {},
                  'maxDate': new Date() };
  this.misc = { 'providers': [] };
  this.header = "New Phone";
  
  this.initFromData = function() {
    
    // get by inventory_id, not database record id
    this.invId = parseInt($routeParams.invIndex, 10);
    
    TelcoService.getAll().then(function(providers) {
      this.misc = { 'providers': providers };
    }.bind(this));

    if (this.invId) { // if editing
      InventoryService.getItem(this.invId).then(function(item) {
        this.form.item = item;
        this.header = "Update Phone";
        var d = Date.parse(this.form.item.last_imaged);
        this.form.item.last_imaged = new Date(d);

        //console.log("HELLO", this.form.item.provider);
      }.bind(this));
    }
  };
  this.initFromData();

  this.submitEdit = function(item, event) {
    InventoryService.update(this.invId, this.form.item).then(
      function(output) {
        $location.path('inventory/' + this.invId);
      }, 
      function() {
        //console.log('error updating inventory');
      }.bind(this));
  };

  this.submitNew = function() {
    InventoryService.create(this.form.item).then(function(newObj) {
      $location.path('inventory/' + newObj.inventory_id);
    }, 
      function() {
        console.log('error adding inventory');
      });
  }
  
};

InventoryFormCtrl.$inject = ['$route', '$routeParams', '$location', 'InventoryService', 'TelcoService'];

angular.module('logisticsApp.controllers')
.controller('InventoryFormCtrl', InventoryFormCtrl);
