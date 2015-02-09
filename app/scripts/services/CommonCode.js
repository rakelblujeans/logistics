'use strict';

angular.module('logisticsApp.services')
.factory('CommonCode', function () {

	var root = {};

	root.sort = {
    column: 'id',
    descending: false
  };
  root.ascending = true;

  root.changeSorting = function(column) {
    var sort = root.sort;
    if (sort.column === column) {
        sort.descending = !sort.descending;
    } else {
        sort.column = column;
        sort.descending = false;
    }
    
    root.ascending = !sort.descending;
  };


  // getFormattedDate("yyyy/mm/dd");
  root.getFormattedDate = function(input){
    var pattern=/(.*?)-(.*?)-(.*?)$/;
    var result = input.replace(pattern,function(match,p1,p2,p3){
      var months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      return p3+'-'+months[(p2-1)]+'-'+p1;
    });
    return result;
  };

  return root;
});
