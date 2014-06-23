angular.module('WITPhoneApp.services', [])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }])
/**
 * A simple example service that returns some data.
 */
    .factory('StaffList', function ($http) {
        var staffList = [];
        return {
            all: function () {
                return staffList = $http.get('http://www.wit.ie/api/get_channel_entries?channel_id=60', {
                    cache: true
                });
            },
            get: function (staffId) {
                // fetch the data first
                if (staffList == '') {
                    staffList = this.all();
                }

                // TODO: refactor so it searches through staffList and not make another http call
                staffList.success(function (data) {
                    console.log(data);
                    for (i = 0; i < data.length; i++) {
                        if (staffId === data[i].entry_id) {
                            return data[i];
                        }
                    }
                });
            }
        }
    });
