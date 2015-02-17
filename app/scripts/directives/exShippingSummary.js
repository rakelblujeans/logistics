'use strict';

function ExShippingSummary(CommonCode) {

	
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
      /*console.log(controller);
      //this.buildOrderHistory = function() {
      scope.doneShipping = false;
      scope.data = [];
      var numPhones = 0;

      for(var j=0; j<controller.shipments.length; j++) {
      /*  console.log(this.shipments[j]);

        var phoneIds = [];
        
        for(var k=0; k<this.shipments[j].phones.length; k++) {
          phoneIds[k] = this.shipments[j].phones[k].id;
        }
        this.data[this.shipments[j].id] = {
          shipmentPhoneIds: '[' + phoneIds.join(',') + ']',
          out_on_date_display: CommonCode.getFormattedDate(this.shipments[j].out_on_date)
        };
        numPhones += this.shipments[j].qty;
      }

      //scope.doneShipping = (numPhones >= scope.phonesInOrder);
      
      };*/
      //this.buildOrderHistory();
    }

	};
}

ExShippingSummary.$inject = ['CommonCode'];

angular.module('logisticsApp.directives')
.directive('exShippingSummary', ExShippingSummary);