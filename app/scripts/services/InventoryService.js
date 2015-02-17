'use strict';

angular.module('logisticsApp.services')
.provider('InventoryService', function () {

    this.$get = ['DataService', function(DataService) {

        var create = function(data) {
            return DataService.post('phones', data);
        };

        // user facing - so reference by inventory id
        var update = function(inventoryId, data) {
            return DataService.update('phones/' + inventoryId, data);
        };

        var getAll = function() {
            return DataService.getAll('phones');
        };

        var getItem = function(index) {
            return DataService.get('phones', index);
        };

        var getAvailability = function(startDate, endDate) {
            return DataService.getAll('phones/available_inventory', {
                'start_date': startDate.toString(),
                'end_date': endDate.toString()
            });
        };

        /*var checkState = function(order) {
            var promise = DataService.getAll('phones/inventory_snapshot/' + order.id)
            .then(function(data) {
              
              //console.log("[" + order.id + "]", data);
              // initialize array to final size, leaving placeholder spots
              // for unassigned phones
              var assignedInventory = new Array(order.num_phones);
              if (data.assignedInventory) {
                  for(var i=0; i<data.assignedInventory.length; i++) {
                    assignedInventory[i] = data.assignedInventory[i];
                  }
              }

              return {
                availableInventory: data.availableInventory,
                assignedInventory: assignedInventory
              };
            });

            return promise;            
        };*/

        var getUpcomingOrders = function(itemId) {
            return DataService.getAll('phones/' + itemId + '/upcoming_orders');
        };

        var getCurrentOrder = function(itemId) {
            return DataService.getAll('phones/' + itemId + '/current_order');
        };

        // user facing - so reference by inventory id
        var checkIn = function(inventoryIds){
            return DataService.post('phones/check_in', {
                'inventory_ids': inventoryIds
            });
        };

        var toggleActivation = function(itemId) {
            return DataService.update('phones/' + itemId + '/toggle_activation');
        };

        /*var checkInventoryState = function(order) {
            var promise = DataService.getAll('phones/inventory_snapshot/' + order.id)
            .then(function(data) {
              
              //console.log("[" + order.id + "]", data);
              // initialize array to final size, leaving placeholder spots
              // for unassigned phones
              var assignedInventory = new Array(order.num_phones);
              if (data.assignedInventory) {
                  for(var i=0; i<data.assignedInventory.length; i++) {
                    assignedInventory[i] = data.assignedInventory[i];
                  }
              }

              return {
                availableInventory: data.availableInventory,
                assignedInventory: assignedInventory
              };
            });

            return promise;            
        };*/

        var service = {
            // inventory
            create: create,
            update: update,
            getAll: getAll,
            getItem: getItem,
            getAvailability: getAvailability,
            //checkInventoryState: checkState,
            getUpcomingOrders: getUpcomingOrders,
            getCurrentOrder: getCurrentOrder,
            checkIn: checkIn,
            toggleActivation: toggleActivation,
        };
        return service;
    }];
});
