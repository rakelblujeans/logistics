'use strict';

function TelcoFormCtrl($scope, $route, $routeParams, $location, DataService) {

  this.form = { 'telco': {} };
  this.header = 'New Telco';

  this.initFromData = function() {
    this.telcoId = parseInt($routeParams.telcoIndex, 10);
    if (this.telcoId) { // if editing
      DataService.getTelco(this.telcoId).then(function(telco) {
        this.form = { 'telco': telco };
        this.header = 'Update telco #' + telco.id;
      });
    }
  };
  this.initFromData;

  this.submitEdit = function() {
    DataService.updateTelco(this.telcoId, this.form.telco).then(function() {
      $location.path('telcos/' + this.telcoId);
    });
    // TODO: add spinner until confirmed saved
  };

  this.submitNew = function() {
    DataService.createTelco(this.form.telco).then(function(newData) {
      // TODO: handle errors
      $location.path('telcos/' + newData.id);
    });
  };
}

angular.module('logisticsApp.controllers')
.controller('TelcoFormCtrl', TelcoFormCtrl);
