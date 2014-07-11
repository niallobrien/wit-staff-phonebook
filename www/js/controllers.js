angular.module('WITPhoneApp.controllers', [])

    .controller('StaffCtrl', function ($scope, StaffList, $q) {
        var staffList = angular.fromJson(window.localStorage['staff_list']);

        // self-executing function
        var saveStaffList = (function saveStaffList() {
            if (staffList) {
                $scope.staff = [];
                for (var i = 0; i < staffList.length; i++) {
                    $scope.staff.push(staffList[i]);
                    //console.log($scope.staff);
                }
            } else {
                getStaffList();
            }
            return saveStaffList;
        }());

        // pull-down to refresh - get the list, then save it first
        $scope.doRefresh = function () {
            updatedStaffList()
                .finally(function () {
                    // Stop the ion-refresher from spinning
                    $scope.$broadcast('scroll.refreshComplete');
                });
        };

        function getStaffList() {
            StaffList.all().success(function (response) {
                StaffList.save(angular.toJson(response));
                $scope.staff = response;
            });
        }

        function updatedStaffList() {
            var localTimestamp = parseInt(StaffList.getLocalTimestamp(staffList));
            var remoteTimestamp = "";
            return StaffList.getRemoteTimestamp(staffList).then(function (data) {
                var remoteTimestamp = parseInt(data.data[0].entry_date);
                if (localTimestamp <= remoteTimestamp) {
                    getStaffList();
                }
            })
        }
    })

    .controller('StaffDetailCtrl', function ($scope, $stateParams, StaffList) {
        staffList = angular.fromJson(window.localStorage['staff_list']);
        if (staffList) {
            $scope.person = StaffList.get($stateParams.staffId, staffList);
        } else {
            StaffList.all().success(function (response) {
                $scope.person = StaffList.get($stateParams.staffId, response);
            })
        }
    });
