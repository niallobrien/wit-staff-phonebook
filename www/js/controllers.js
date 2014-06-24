angular.module('WITPhoneApp.controllers', [])

    .controller('StaffCtrl', function ($scope, StaffList) {
        StaffList.all().then(function (response) {
            $scope.staff = response.data;
        });
    })

    .controller('StaffDetailCtrl', function ($scope, $stateParams, StaffList) {
        StaffList.get($stateParams.staffId).then(function(response) {
            $scope.person = response;
        });
    });
