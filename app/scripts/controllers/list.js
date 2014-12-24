'use strict';
/*
* Used to define common functionality across list views, 
* primarily sorting.
* 
*/

function ListCtrl($scope) {
    
  $scope.sort = {
    column: 'id',
    descending: false
  };
  $scope.ascending = true;

  $scope.changeSorting = function(column) {
    var sort = this.sort;
    if (sort.column === column) {
        sort.descending = !sort.descending;
    } else {
        sort.column = column;
        sort.descending = false;
    }
    
    this.ascending = !sort.descending;
  };

}
