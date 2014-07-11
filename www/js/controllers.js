angular.module('WITPhoneApp.controllers', [])

    .controller('StaffCtrl', function(StaffList, $scope) {
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
            StaffList.update($scope.staff).then(function (newStaffList) {
                // Promise was resolved. List needs updating!
                $scope.staffList = newStaffList;
            }, function () {
                // Promise was rejected. No update needed!
            }).finally(function () {
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
