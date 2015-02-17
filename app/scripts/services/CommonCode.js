'use strict';

angular.module('logisticsApp.services')
.factory('CommonCode', ['InventoryService', function (InventoryService) {

	var root = {};

  // getFormattedDate("yyyy/mm/dd");
  root.getFormattedDate = function(input){
    var pattern=/(.*?)-(.*?)-(.*?)$/;
    var result = input.replace(pattern,function(match,p1,p2,p3){
      var months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      return p3+'-'+months[(p2-1)]+'-'+p1;
    });
    return result;
  };

  // Inventory ////////////////////////////

  root.getPhoneIds = function(order) {
    var assignedPhones = [];
    for(var i=0; i<order.phones.length; i++) {
      if (order.phones[i]) {
        // always display by human-readable "inventory_id", not database id
        assignedPhones[assignedPhones.length] = order.phones[i].inventory_id;
      }
    }
    return assignedPhones;
  };

  root.buildPhoneIdString = function(order) {
    return '[' + root.getPhoneIds(order).join(',') + ']';
  };

  root.getAvailableInventory = function(order, orderData) {
    orderData.phoneSlots = order.phones;

    orderData.assignedPhoneIds = root.buildPhoneIdString(order);
    var promise = InventoryService.getAvailability(order.arrival_date, order.departure_date).then(function(data) {
      orderData.availableInventory = data;
      orderData.slotsAvailable = 0;
      for (var i=0; i<order.num_phones; i++) {
        if (order.phones[i] === undefined) {
          orderData.slotsAvailable++;
        }
      }
    }.bind(this));

    return promise;
  };

  return root;
}]);