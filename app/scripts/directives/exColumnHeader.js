'use strict';

function ExColumnHeader() {

	var controller = function() {

	  this.changeSorting = function(column) {
	    var desc = this.orderBy.descending;
	    if (this.orderBy.columnName === column) {
        this.orderBy.descending = !desc;
	    } else {
        this.orderBy.columnName = column;
        this.orderBy.descending = false;
	    }
	  };
	};

	return {
		restrict: 'A',
		scope: {
      columnName: '@',
      displayText: '@',
      orderBy: '='
    },
    templateUrl: '/scripts/directives/ex-column-header.html',
		bindToController: true,
    controllerAs: 'ctrl',
		controller: controller
	};
}

angular.module('logisticsApp.directives')
.directive('exColumnHeader', ExColumnHeader);