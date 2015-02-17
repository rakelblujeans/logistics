'use strict';

function ExInventoryTable() {

	var controller = function () {
		this.orderBy = { 
	    columnName: 'id',
	    descending: false
	  };
	};

	return {
		restrict: 'E',
		scope: {
      phones:'='
    },
    templateUrl: '/scripts/directives/ex-inventory-table.html',
		bindToController: true,
    controllerAs: 'ctrl',
		controller: controller
	};
}

angular.module('logisticsApp.directives')
.directive('exInventoryTable', ExInventoryTable);