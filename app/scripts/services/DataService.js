'use strict';

angular.module('logisticsApp.services')
.provider('DataService', function () {
    /*var inventory = '', 
    customers = '', 
    orders = '', 
    telcos = '';*/

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
                //console.log("SUCCESS", output);
                d.resolve(output);
            }).error(function(reason) {
                d.reject(reason);
                //console.log('ERROR', reason);
            });
            return d.promise;
        };

        // TODO: handle errors?
        var create = function(collectionName, data) {
            var promise = postData(collectionName, data).then(function(output) {
                return output;
            });
            return promise;
        };

        // TODO: handle errors?
        var update = function(collectionName, id, data) {
            var promise = updateData(collectionName + '/' + id, data).then(function(output) {
                return output;
            });
            return promise;
        };

        // TODO: handle errors?
        var get = function(collectionName, id) {
            var promise = getData(collectionName + '/' + id).then(function(output) {
                return output;
            });
            return promise;
        };

        // TODO: handle errors?
        var getAll = function(collectionName) {
            var promise = getData(collectionName).then(function(output) {
                return output;
            });
            return promise;
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

        var createCustomer = function(data){
            return create('customers', data);
        };

        var updateCustomer = function(id, data) {
            return update('customers', id, data);
        };

        var getCustomers = function() {
            return getAll('customers');
        };

        var getCustomer = function(index) {
            return get('customers', index);
        };

        var createInventory = function(data) {
            return create('phones', data);
        };

        var updateInventory = function(id, data) {
            return update('phones', id, data);
        };

        var getInventory = function() {
            return getAll('phones');
        };

        var getItem = function(index) {
            return get('phones', index);
        };

        var createOrder = function(data) {
            return create('orders', data);
        };

        var updateOrder = function(id, data) {
            return update('orders', id, data);
        };

        var getOrders = function() {
            return getAll('orders');
        };

        var getOrder = function(index) {
            return get('orders', index);
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
            return getAll('providers');
        };

        var getTelcoName = function(id) {
            var promise = getData('providers/' + id).then(function(data) {
                return data.name;
            });
            return promise;
        };

        var service = {
            create: create,
            update: update,
            get: get,
            getAll: getAll,

            createInventory: createInventory,
            getInventory: getInventory,
            getItem: getItem,
            updateInventory: updateInventory,

            createCustomer: createCustomer,
            getCustomers: getCustomers,
            getCustomer: getCustomer,
            updateCustomer: updateCustomer,
            
            //getCustomerCards: getCustomerCards,
            createOrder: createOrder,
            getOrders: getOrders,
            getOrder: getOrder,
            updateOrder: updateOrder,

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
