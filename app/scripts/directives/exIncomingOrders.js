'use strict';

function ExIncomingOrders(ModalLogic) {

	var controller = function () {
		this.modalObj = ModalLogic;
		this.modalObj.updateDataFn = this.updateDataFn;
	};

	return {
		restrict: 'E',
		scope: {
      orders: '=',
			updateDataFn: '&'
    },
		templateUrl: '/scripts/directives/ex-incoming-orders.html',
		bindToController: true,
    controllerAs: 'ctrl',
		controller: controller
	};
}

ExIncomingOrders.$inject = ['ModalLogic'];

angular.module('logisticsApp.directives')
.directive('exIncomingOrders', ExIncomingOrders);