angular.module('WITPhoneApp.services', [])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }])
/**
 * A simple example service that returns some data.
 */
    .factory('StaffList', function ($http) {

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
            update: function (staffList) {
                // get local last updated timestamp
                var lastUpdatedLocal = "";
                var lastUpdatedRemote = "";
                for (i=0; i < staffList.length; i++) {
                    // get largest (most recent) timestamp
                    if(staffList[i].entry_date > lastUpdatedLocal) {
                        lastUpdatedLocal = staffList[i].entry_date;
                    }
                }
                // return newest entry based on the timestamp
                //console.log(lastUpdatedLocal);

                // get remote last updated timestamp
                var promise = $http.get('http://www.wit.ie/api/get_channel_entries?channel_id=60&order_by=entry_date&limit=1')
                    .success(function(data, status, header, config) {
                        return lastUpdatedRemote = data[0].entry_date;
                        //console.log("Local: " + lastUpdatedLocal + ". Remote: " + lastUpdatedRemote);
                    }).then(function(response) {
                        return response.data[0].entry_date;
                    }).then(function(response) {
                       return response;
                    });
                console.log(promise);
            }
        }
    });
