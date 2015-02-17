'use strict';

angular.module('logisticsApp.services')
.provider('OrderService', function () {

    this.deliveryTransitTimeSending = 0;
    this.deliveryTransitTimeReturn = 0;

    this.$get = ['DataService', function(DataService) {
        var deliveryTransitTimeSending = this.deliveryTransitTimeSending;
        var deliveryTransitTimeReturn = this.deliveryTransitTimeReturn;
        
        var timeSpentSendingDelivery = function() {
            return deliveryTransitTimeSending;
        };

        var timeSpentReturningDelivery = function() {
            return deliveryTransitTimeReturn;
        };

        var create = function(data) {
            return DataService.post('orders', data);
        };

        var update = function(id, data) {
            return DataService.update('orders/' + id, data);
        };

        var getAll = function(options) {
            //console.log(options);
            if (options.unverified) {
                return DataService.getAll('orders/unverified');
            } else if (options.unshipped) {
                return DataService.getAll('orders/verified');
            }else {
                return DataService.getAll('orders');
            }
        };

        var get = function(index) {
            return DataService.get('orders', index);
        };

        var assignDevice = function(orderId, phoneId) {
            //console.log('SENDING', orderId, phoneId);
            return DataService.post('orders/assign_device', {
                'id': orderId,
                'phone_id': phoneId
            });
        };

        var unassignDevice = function(orderId, inventoryId) {
            return DataService.post('orders/unassign_device', {
                'id': orderId,
                'phone_id': inventoryId
            });
        };

        var markVerified = function(orderId, isVerified) {
            return DataService.post('orders/mark_verified', {
                'id': orderId,
                'is_verified': isVerified
            });
        };

        var getIncoming = function(date) {
            return DataService.getAll('orders/incoming_on', 
                {'date': date });
        };

        var getOutbound = function(date) {
            return DataService.getAll('orders/outbound_on', 
                {'date': date });
        };

        var getCurrentlyOut = function() {
            return DataService.getAll('orders/currently_out');
        };

        // i.e. cancel / uncancel an order
        var toggleOrderActivation = function(itemId) {
            return DataService.update('orders/' + itemId + '/toggle_activation');
        };

        var getAllWarnings = function() {
            return DataService.getAll('orders/warnings');
        };

        var getOverdueOrders = function() {
            return getAll('orders/overdue');
        };

        var getOverdueShipping = function() {
            return DataService.getAll('orders/overdue_shipping');
        };

        var getOrdersMissingPhones = function() {
            return DataService.getAll('orders/missing_phones');
        };

        var service = {
            // common function
            timeSpentSendingDelivery: timeSpentSendingDelivery,
            timeSpentReturningDelivery: timeSpentReturningDelivery,
            // orders
            create: create,
            getAll: getAll,
            get: get,
            update: update,
            assignDevice: assignDevice,
            unassignDevice: unassignDevice,
            markVerified: markVerified,
            getIncoming: getIncoming,
            getOutbound: getOutbound,
            getCurrentlyOut: getCurrentlyOut,
            toggleOrderActivation: toggleOrderActivation,
            // warnings
            getAllWarnings: getAllWarnings,
            getOverdueOrders: getOverdueOrders,
            getOverdueShipping: getOverdueShipping,
            getOrdersMissingPhones: getOrdersMissingPhones,
        };
        return service;
    }];
});
