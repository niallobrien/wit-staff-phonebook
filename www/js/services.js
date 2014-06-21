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
                return $http({
                    method: 'GET',
                    cache: true,
                    url: 'http://www.wit.ie/api/get_channel_entries?channel_id=60'
                })
            },
            get: function (staffId) {
                return $http({
                    method: 'GET',
                    cache: true,
                    url: 'http://www.wit.ie/api/get_channel_entry?entry_id=' + staffId
                });
            }
        }
    });
