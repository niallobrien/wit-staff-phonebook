angular.module('WITPhoneApp.services', [])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }])
/**
 * A simple example service that returns some data.
 */
    .factory('StaffList', function ($http, $q) {
        var _isUpdating = {isUpdating: false};

        var isUndefinedOrNull = function (val) {
            return angular.isUndefined(val) || val === null;
        };

        return {
            all: function () {
                var staffList = window.localStorage['staff_list'];
                // Create a new deferred object
                var deferred = $q.defer();
                if (isUndefinedOrNull(staffList)) {
                    console.log("No staff list");
                    $http.get('http://www.wit.ie/api/get_channel_entries?channel_id=60', {cache: true})
                        .then(function (response) {
                            deferred.resolve(response);
                        });
                    return deferred.promise;
                }
                return angular.fromJson(staffList);
            },
            get: function (staffId, data) {
                // search through staffList so not to make another http call
                for (i = 0; i < data.length; i++) {
                    if (staffId === data[i].entry_id) {
                        return data[i];
                    }
                }
            },
            save: function (object) {
                window.localStorage['staff_list'] = angular.toJson(object.data);
            },
            isUpdating: _isUpdating
        }
    });
