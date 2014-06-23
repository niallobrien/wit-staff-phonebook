angular.module('WITPhoneApp.controllers', [])

.controller('StaffCtrl', function($scope, StaffList) {
        StaffList.all().then(function(response) {
            $scope.staff = response.data;
        });
    })

.controller('StaffDetailCtrl', function($scope, $stateParams, StaffList) {
  var test = StaffList.get($stateParams.staffId);
    console.log(test);
    });
