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


  // getFormattedDate("yyyy/mm/dd");
  $scope.getFormattedDate = function(input){
    var pattern=/(.*?)-(.*?)-(.*?)$/;
    var result = input.replace(pattern,function(match,p1,p2,p3){
      var months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      return p3+"-"+months[(p2-1)]+"-"+p1;
    });
    return result;
  }

}
