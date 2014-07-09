angular.module('WITPhoneApp.controllers', [])

    .controller('StaffCtrl', function ($scope, StaffList) {
        var staffList = angular.fromJson(window.localStorage['staff_list']);
        if (staffList) {
            $scope.staff = [];
            for (var i = 0; i < staffList.length; i++) {
                $scope.staff.push(staffList[i]);
            }
        } else {
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
