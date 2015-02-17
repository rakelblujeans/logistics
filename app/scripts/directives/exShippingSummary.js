'use strict';

function ExShippingSummary(CommonCode, $timeout) {

	
	return {
		restrict: 'E',
		scope: {
      shipments:'=',
      phonesInOrder:'='
    },
    templateUrl: '/scripts/directives/ex-shipping-summary.html',
		bindToController: true,
    controllerAs: 'ctrl2',
    controller: function () {

    },
		link: function(scope, elem, attr, controller) {

      function buildOrderHistory() {

        controller.data = [];
        var numPhones = 0;

        var shipments = controller.shipments;
        for(var j=0; j<shipments.length; j++) {

          var phoneIds = [];
          
          for(var k=0; k<shipments[j].phones.length; k++) {
            phoneIds[k] = shipments[j].phones[k].id;
          }
          controller.data[shipments[j].id] = {
            shipmentPhoneIds: '[' + phoneIds.join(',') + ']',
            out_on_date_display: CommonCode.getFormattedDate(shipments[j].out_on_date)
          };
          numPhones += shipments[j].qty;
        }
        
        controller.doneShipping = (numPhones >= controller.phonesInOrder);
      };

      // make sure DOM has finished loading first
      $timeout(buildOrderHistory, 15);
    },

	};
}

ExShippingSummary.$inject = ['CommonCode', '$timeout'];

angular.module('logisticsApp.directives')
.directive('exShippingSummary', ExShippingSummary);