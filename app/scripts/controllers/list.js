'use strict';
/*
* Used to define common functionality across list views, 
* primarily sorting.
* 
*/

function ListCtrl($scope, DataService) {
    
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

  $scope.toggleActivation = function(item, collectionName) {
    DataService.setActive(collectionName, item.id, 
      !item.active).then(function(success){
      if (success) {
        item.active = !item.active;
      }
    });
  };
}
