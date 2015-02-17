'use strict';

angular.module('logisticsApp.services')
.provider('DataService', function () {

    // configurable fields. look up values in app.js
    this.localUrl = '';
    this.remoteUrl = '';
    this.useRemote = '';

    this.$get = ['$http', '$q', function($http, $q) {
        var remoteUrl = this.remoteUrl;
        var localUrl = this.localUrl;
        var useRemote = this.useRemote;

        // get object data
        var getData = function(dataPoint, params) {
            var d = $q.defer();
            var url;
            if (useRemote) {
                url = remoteUrl + dataPoint + '.json';
            } else {
                url = localUrl + dataPoint + '.json';
            }
            
            //console.log(url, params);
            $http({
                method: 'GET',
                url: url,
                params: params,
            })
            .success(function(data) {
                //console.log('SUCCESS', data);
                d.resolve(data);
            }).error(function(reason) {
                d.reject(reason);
                //console.log('REJECT', reason);
            });
            return d.promise;
        };

        // update existing objects
        var updateData = function(dataPoint, params) {
            var d = $q.defer();
            var url;
            if (useRemote) {
                url = remoteUrl + dataPoint + '.json';
            } else {
                url = localUrl + dataPoint + '.json';
            }
            
            //console.log(params);
            $http({
                method: 'PUT',
                url: url,
                data: params,
            })
            .success(function(output) {
                //console.log(output);
                d.resolve(output);
            }).error(function(reason) {
                d.reject(reason);
                //console.log(reason);
            });
            return d.promise;
        };

        // create new objects
        var postData = function(dataPoint, params) {
            var d = $q.defer();
            var url;
            if (useRemote) {
                url = remoteUrl + dataPoint + '.json';
            } else {
                url = localUrl + dataPoint + '.json';
            }
            
            //console.log(params);
            $http({
                method: 'POST',
                url: url,
                data: params,
            })
            .success(function(output) {
                //console.log('SUCCESS', output);
                d.resolve(output);
            }).error(function(reason) {
                d.reject(reason);
                //console.log('ERROR', reason);
            });
            return d.promise;
        };

        // delete objects
        var deleteData = function(dataPoint, params) {
            var d = $q.defer();
            var url;
            if (useRemote) {
                url = remoteUrl + dataPoint + '.json';
            } else {
                url = localUrl + dataPoint + '.json';
            }
            
            //console.log(params);
            $http({
                method: 'DELETE',
                url: url,
                params: params,
            })
            .success(function(data) {
                //console.log("SUCCESS", data);
                d.resolve(data);
            }).error(function(reason) {
                d.reject(reason);
                //console.log("REJECT", reason);
            });
            return d.promise;
        };

        var post = function(collectionName, data) {
            var promise = postData(collectionName, data).then(function(output) {
                return output;
            });
            return promise;
        };

        var update = function(collectionName, data) {
            var promise = updateData(collectionName, data).then(function(output) {
                return output;
            });
            return promise;
        };

        var get = function(collectionName, id) {
            var promise = getData(collectionName + '/' + id).then(function(output) {
                return output;
            });
            return promise;
        };

        var getAll = function(collectionName, data) {
            var promise = getData(collectionName, data).then(function(output) {
                return output;
            });
            return promise;
        };

        // "delete" is a protected token so I had to use a diff name...
        var deleteObj = function(collectionName, data) {
            var promise = deleteData(collectionName, data).then(function(output) {
                return output;
            });
            return promise;
        };

        var searchAll = function(searchTerms) {
            return getAll('home/search', {
                'q': searchTerms
            });
        };

        var service = {

            post: post,
            update: update,
            get: get,
            getAll: getAll,
            deleteObj: deleteObj,

            searchAll: searchAll,
        };
        return service;
    }];
});
