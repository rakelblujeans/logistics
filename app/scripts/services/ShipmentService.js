'use strict';

angular.module('logisticsApp.services')
.provider('ShipmentService', function () {

    this.$get = ['DataService', function(DataService) {
 
        var create = function(data) {
            return DataService.post('shipments', data);
        };

        var update = function(id, data) {
            return DataService.update('shipments/' + id, data);
        };

        var getAll = function() {
            return DataService.getAll('shipments');
        };

        var get = function(index) {
            return DataService.get('shipments', index);
        };

        var service = {
            create: create,
            update: update,
            getAll: getAll,
            get: get,
        };
        return service;
    }];
});
