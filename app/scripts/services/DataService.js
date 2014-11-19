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

        //----------------------------------------
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

        //----------------------------------------
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

        //----------------------------------------
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

        //----------------------------------------
        var createCreditCard = function(data) {
            return create('credit_cards', data);
        };

        var updateCreditCard = function(id, data) {
            return update('credit_cards', id, data);
        };

        var getCreditCards = function() {
            return getAll('credit_cards');
        };

        var getCreditCard = function(index) {
            return get('credit_cards', index);
        };

        //----------------------------------------
        var createEventLog = function(data) {
            return create('event_logs', data);
        };

        var updateEventLog = function(id, data) {
            return update('event_logs', id, data);
        };

        var getEventLogs = function() {
            return getAll('event_logs');
        };

        var getEventLog = function(index) {
            return get('event_logs', index);
        };

        //----------------------------------------
        var createTelco = function(data) {
            return create('providers', data);
        };

        var updateTelco = function(id, data) {
            return update('providers', id, data);
        };

        var getTelcos = function() {
            return getAll('providers');
        };

        var getTelco = function(index) {
            return get('providers', index);
        };

        //----------------------------------------
        var createShipment = function(data) {
            return create('shipments', data);
        };

        var updateShipment = function(id, data) {
            return update('shipments', id, data);
        };

        var getShipments = function() {
            return getAll('shipments');
        };

        var getShipment = function(index) {
            return get('shipments', index);
        };

        //----------------------------------------
        var createReceipt = function(data) {
            return create('receipts', data);
        };

        var updateReceipt = function(id, data) {
            return update('receipts', id, data);
        };

        var getReceipts = function() {
            return getAll('receipts');
        };

        var getReceipt = function(index) {
            return get('receipts', index);
        };
        //----------------------------------------
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
            deactivate: deactivate,
            activate: activate,
            setActive: setActive,

            createInventory: createInventory,
            getInventory: getInventory,
            getItem: getItem,
            updateInventory: updateInventory,

            createCustomer: createCustomer,
            getCustomers: getCustomers,
            getCustomer: getCustomer,
            updateCustomer: updateCustomer,
            
            createOrder: createOrder,
            getOrders: getOrders,
            getOrder: getOrder,
            updateOrder: updateOrder,

            createCreditCard: createCreditCard,
            updateCreditCard: updateCreditCard,
            getCreditCards: getCreditCards,
            getCreditCard: getCreditCard,

            createEventLog: createEventLog,
            updateEventLog: updateEventLog,
            getEventLogs: getEventLogs,
            getEventLog: getEventLog,

            createTelco: createTelco,
            updateTelco: updateTelco,
            getTelcos: getTelcos,
            getTelco: getTelco,

            createShipment: createShipment,
            updateShipment: updateShipment,
            getShipments: getShipments,
            getShipment: getShipment,

            createReceipt: createReceipt,
            updateReceipt: updateReceipt,
            getReceipt: getReceipt,
            getReceipts: getReceipts,

            getTelcoName: getTelcoName,
        };
        return service;
    }];
});
