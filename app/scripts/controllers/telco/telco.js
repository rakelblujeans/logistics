'use strict';

function TelcoCtrl($http, $window, $route, $routeParams, TelcoService) {
    
  this.orderBy = { 
    columnName: 'id',
    descending: false
  };
  
  this.initFromData = function() {
    this.telcoId = parseInt($routeParams.telcoIndex, 10);
    if (this.telcoId) { // detail view
      TelcoService.get(this.telcoId).then(function(telco) {
        this.telco = telco;
      }.bind(this));
    } else { // list view
      TelcoService.getAll().then(function(data) {
        this.telcos = data;
      }.bind(this));
    }
   };
  this.initFromData();
}

TelcoCtrl.$inject = ['$http', '$window', '$route', '$routeParams', 'TelcoService'];

angular.module('logisticsApp.controllers')
.controller('TelcoCtrl', TelcoCtrl);
