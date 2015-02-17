'use strict';

angular.module('logisticsApp.services')
.provider('TelcoService', function () {

    this.$get = ['DataService', function(DataService) {

        var create = function(data) {
            return DataService.post('providers', data);
        };

        var update = function(id, data) {
            return DataService.update('providers/' + id, data);
        };

        var getAll = function() {
            return DataService.getAll('providers');
        };

        var get = function(index) {
            return DataService.get('providers', index);
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
