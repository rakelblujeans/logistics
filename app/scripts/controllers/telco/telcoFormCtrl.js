'use strict';

function TelcoFormCtrl($route, $routeParams, $location, TelcoService) {

  this.form = { 'telco': {} };
  this.header = 'New Telco';

  this.initFromData = function() {
    this.telcoId = parseInt($routeParams.telcoIndex, 10);
    if (this.telcoId) { // if editing
      TelcoService.get(this.telcoId).then(function(telco) {
        this.form = { 'telco': telco };
        this.header = 'Update telco #' + telco.id;
      });
    }
  };
  this.initFromData;

  this.submitEdit = function() {
    TelcoService.update(this.telcoId, this.form.telco).then(function() {
      $location.path('telcos/' + this.telcoId);
    });
    // TODO: add spinner until confirmed saved
  };

  this.submitNew = function() {
    TelcoService.create(this.form.telco).then(function(newData) {
      // TODO: handle errors
      $location.path('telcos/' + newData.id);
    });
  };
}

TelcoFormCtrl.$inject = ['$route', '$routeParams', '$location', 'TelcoService'];

angular.module('logisticsApp.controllers')
.controller('TelcoFormCtrl', TelcoFormCtrl);
