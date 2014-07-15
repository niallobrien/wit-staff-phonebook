angular.module('WITPhoneApp.services', [])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }])
/**
 * A simple example service that returns some data.
 */
    .factory('StaffList', function ($http, $q) {

        return {
            all: function () {
                return $http.get('http://www.wit.ie/api/get_channel_entries?channel_id=60', {
                    cache: true
                })
            },
            get: function (staffId, data) {
                // search through staffList so not to make another http call
                for (i = 0; i < data.length; i++) {
                    if (staffId === data[i].entry_id) {
                        return data[i];
                    }
                }
            },
            save: function (data) {
                window.localStorage['staff_list'] = data;
            },
            update: function(staffList) {
                // Create a new deferred object
                var deferred = $q.defer();
                // get local last updated timestamp
                var lastUpdatedLocal = "";
                for (i=0; i < staffList.length; i++) {
                    // get largest (most recent) timestamp
                    if(staffList[i].entry_date > lastUpdatedLocal) {
                        lastUpdatedLocal = staffList[i].entry_date;
                    }
                }

                // Make a call to the remote api
                $http.get('http://www.wit.ie/api/get_channel_entries?channel_id=60&order_by=entry_date&limit=1').then(function(response) {

                    // Get the remote last updated
                    // time from the response
                    var lastUpdatedRemote = response.data[0].entry_date;

                    // Check if local or remote is larger
                    // You probably need to modify this
                    // depending on your datetime formatting.
                    // I am assuming an epoch string.
                    if (lastUpdatedRemote > lastUpdatedLocal) {
                        // Resolve the deferred and return
                        // the data so that the controller can
                        // use it to update the view
                        deferred.resolve(response.data);
                    } else {
                        // Since we don't need to do anything,
                        // reject the deferred
                        deferred.reject();
                    }
                });
                // Return the promise from the deferred object
                // immediately. We will eventually either
                // resolve or reject it, but at the start, it
                // will be in a pending state.
                return deferred.promise;
            },
            getLocalTimestamp: function (staffList) {
                var lastUpdatedLocal = "";
                for (i = 0; i < staffList.length; i++) {
                    // get largest (most recent) timestamp
                    if (staffList[i].entry_date > lastUpdatedLocal) {
                        lastUpdatedLocal = staffList[i].entry_date;
                    }
                }
                return lastUpdatedLocal;
            },
            getRemoteTimestamp: function () {
                return $http.get('http://www.wit.ie/api/get_channel_entries?channel_id=60&order_by=entry_date&limit=1')
                    .success(function (data, status, headers, config) {
                        return data;
                    });
            }
        }
    });
