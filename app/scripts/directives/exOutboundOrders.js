'use strict';

function ExOutboundOrders() {
	return {
		restrict: 'E',
		scope: {
      orders: '=',
    },
    templateUrl: '/scripts/directives/ex-outbound-orders.html',
		bindToController: true,
    controllerAs: 'ctrl',
		controller: function() {
		}
	};
}

angular.module('logisticsApp.directives')
.directive('exOutboundOrders', ExOutboundOrders);