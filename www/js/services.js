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
                return staffList = $http.get('http://www.wit.ie/api/get_channel_entries?channel_id=60', {
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
            }
        }
    });
