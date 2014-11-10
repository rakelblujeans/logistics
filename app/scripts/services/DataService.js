'use strict';

angular.module('logisticsApp.services')
.provider('DataService', function () {
    var inventory = '', 
    customers = '', 
    orders = '', 
    telcos = '';

    // configurable fields. look up values in app.js
    this.localUrl = '';
    this.remoteUrl = '';
    this.useRemote = '';

    this.$get = ['$http', '$q', function($http, $q) {
        var remoteUrl = this.remoteUrl;
        var localUrl = this.localUrl;
        var useRemote = this.useRemote;

        var getData = function(dataPoint) {
            var d = $q.defer();
            var url;
            if (useRemote) {
                //url = sprintf(remoteUrl, dataPoint);
                url = remoteUrl + dataPoint + '.json';
            } else {
                //url = sprintf(localUrl, dataPoint);
                url = localUrl + dataPoint + '.json';
            }
            
            $http({
                method: 'GET',
                url: url,
            })
            .success(function(data) {
                d.resolve(data);
            }).error(function(reason) {
                d.reject(reason);
            });
            return d.promise;
       };

        var getInventory = function() {
            var promise = getData('phones').then(function(data) {
                inventory = data;
                return data;
            });
            return promise;
        };

        var getCustomers = function() {
            var promise = getData('customers').then(function(data) {
                customers = data;
                return data;
            });
            return promise;
        };

        var getOrders = function() {
            var promise = getData('customers').then(function(data) {
                orders = data;
                return data;
            });
            return promise;
        };

        var getTelcos = function() {
            var promise = getData('providers').then(function(data) {
                telcos = data;
                return data;
            });
            return promise;
        };

        var service = {
            getInventory: getInventory,
            getCustomers: getCustomers,
            getOrders: getOrders
        };
        return service;
    }];
});
