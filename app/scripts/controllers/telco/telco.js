'use strict';

function TelcoCtrl($http, $window, $route, $routeParams, DataService, CommonCode) {
    
  this.sort = CommonCode.sort;
  this.ascending = CommonCode.ascending;
  this.changeSorting = CommonCode.changeSorting;
  this.getFormattedDate = CommonCode.getFormattedDate;
  
  this.initFromData = function() {
    this.telcoId = parseInt($routeParams.telcoIndex, 10);
    if (this.telcoId) { // detail view
      DataService.getTelco(this.telcoId).then(function(telco) {
        this.telco = telco;
      });
    } else { // list view
      DataService.getTelcos().then(function(data) {
        this.telcos = data;
      });  
    }
   };
  this.initFromData;
}

angular.module('logisticsApp.controllers')
.controller('TelcoCtrl', TelcoCtrl);
