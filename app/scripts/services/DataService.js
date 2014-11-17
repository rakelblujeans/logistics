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

        // get object data
        var getData = function(dataPoint) {
            var d = $q.defer();
            var url;
            if (useRemote) {
                url = remoteUrl + dataPoint + '.json';
            } else {
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

        // update existing objects
        var updateData = function(dataPoint, params) {
            var d = $q.defer();
            var url;
            if (useRemote) {
                url = remoteUrl + dataPoint + '.json';
            } else {
                url = localUrl + dataPoint + '.json';
            }
            
            $http({
                method: 'PUT',
                url: url,
                data: params,
            })
            .success(function(output) {
                console.log(output);
                d.resolve(output);
            }).error(function(reason) {
                d.reject(reason);
                console.log(reason);
            });
            return d.promise;
        };

        // create new objects
        var postData = function(dataPoint, params) {
            var d = $q.defer();
            var url;
            if (useRemote) {
                url = remoteUrl + dataPoint + '.json';
            } else {
                url = localUrl + dataPoint + '.json';
            }
            
            // all creations should be active by default!
            params['active'] = 'true';

            console.log(params);
            $http({
                method: 'POST',
                url: url,
                data: params,
            })
            .success(function(output) {
                console.log("SUCCESS", output);
                d.resolve(output);
            }).error(function(reason) {
                d.reject(reason);
                console.log('ERROR', reason);
            });
            return d.promise;
        };

        // TODO: handle errors?
        var createCustomer = function(data){
            postData('customers', data);
        };

        // TODO: handle errors?
       var updateCustomer = function(id, data) {
            updateData('customers/' + id, data);
       };

       var setActive = function(objPlural, id, newVal) {
            var promise = updateData(objPlural + '/' + id, {
                'active': newVal
            }).then(function(){
                return true;
            }, function() {
                return false;
            });

            return promise;
       };

        var deactivate = function(objPlural, id) {
            updateData(objPlural + '/' + id, {
                'active': false
            });
        };

        var activate = function(objPlural, id) {
            updateData(objPlural + '/' + id, {
                'active': true
            });   
        };

        var getInventory = function() {
            var promise = getData('phones').then(function(data) {
                inventory = data;
                return data;
            });
            return promise;
        };

        var getItem = function(index) {
            var promise = getData('phones/' + index).then(function(data) {
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

        var getCustomer = function(index) {
            var promise = getData('customers/' + index ).then(function(data) {
                return data;
            });
            return promise;
        };

        var getOrders = function() {
            var promise = getData('orders').then(function(data) {
                orders = data;
                return data;
            });
            return promise;
        };

         var getOrder = function(index) {
            var promise = getData('orders/' + index).then(function(data) {
                return data;
            });
            return promise;
        };

        //var getOrdersByPhone = function(index) {
            /*var promise = getData('orders').then(function(data) {
                orders = data;
                //for (order in orders) {
                //    
                //}
                return data;
            });
            return promise;*/
        //};

        var getTelcos = function() {
            var promise = getData('providers').then(function(data) {
                telcos = data;
                return data;
            });
            return promise;
        };

        var getTelcoName = function(id) {
            var promise = getData('providers/' + id).then(function(data) {
                return data.name;
            });
            return promise;
        };

        var service = {
            getInventory: getInventory,
            getItem: getItem,
            createCustomer: createCustomer,
            getCustomers: getCustomers,
            getCustomer: getCustomer,
            updateCustomer: updateCustomer,
            
            //getCustomerCards: getCustomerCards,
            getOrders: getOrders,
            getOrder: getOrder,
            //getOrdersByPhone: getOrdersByPhone,
            getTelcos: getTelcos,
            getTelcoName: getTelcoName,
            deactivate: deactivate,
            activate: activate,
            setActive: setActive
        };
        return service;
    }];
});
