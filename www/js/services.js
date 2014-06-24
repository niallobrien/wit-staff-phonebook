angular.module('WITPhoneApp.services', [])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }])
/**
 * A simple example service that returns some data.
 */
    .factory('StaffList', function ($http) {
        var staffList = [],
            staffMember = {};

        return {
            all: function () {
                // returns promise object
                return staffList = $http.get('http://www.wit.ie/api/get_channel_entries?channel_id=60', {
                    cache: true
                });
            },
            get: function (staffId) {
                // fetch the data first
                if (staffList == '') {
                    staffList = this.all();
                }
                // search through staffList so not to make another http call
                return staffList.then(function(response) {
                    for (i = 0; i < response.data.length; i++) {
                        if (staffId === response.data[i].entry_id) {
                            return response.data[i];
                        }
                    }
                });
            }
        }
    });
