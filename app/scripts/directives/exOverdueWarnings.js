'use strict';

function ExOverdueWarnings(ModalLogic) {

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
		templateUrl: '/scripts/directives/ex-overdue-warnings.html',
		bindToController: true,
    controllerAs: 'ctrl',
		controller: controller
	};
}

ExOverdueWarnings.$inject = ['ModalLogic'];

angular.module('logisticsApp.directives')
.directive('exOverdueWarnings', ExOverdueWarnings);