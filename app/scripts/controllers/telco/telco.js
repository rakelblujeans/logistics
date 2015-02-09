'use strict';

function TelcoCtrl($http, $window, $route, $routeParams, DataService, CommonCode) {
    
  this.sort = CommonCode.sort;
  this.ascending = CommonCode.ascending;
  this.changeSorting = CommonCode.changeSorting;
  
  this.initFromData = function() {
    this.telcoId = parseInt($routeParams.telcoIndex, 10);
    var thisCopy = this;
    if (this.telcoId) { // detail view
      DataService.getTelco(this.telcoId).then(function(telco) {
        thisCopy.telco = telco;
      });
      this.telco = thisCopy.telco;
    } else { // list view
      DataService.getTelcos().then(function(data) {
        thisCopy.telcos = data;
        console.log(data);
      });
      this.telcos = thisCopy.telcos;
    }
   };
  this.initFromData();
}

angular.module('logisticsApp.controllers')
.controller('TelcoCtrl', TelcoCtrl);
