angular.module('WITPhoneApp.controllers', [])

.controller('StaffCtrl', function($scope, StaffList) {
        StaffList.all().then(function(response) {
            $scope.staff = response.data;
        });
    })

.controller('StaffDetailCtrl', function($scope, $stateParams, StaffList) {
  StaffList.get($stateParams.staffId).then(function(response) {
      // a person array is returned even though it's only got one element, so we access it at [0]
      $scope.person = response.data[0];
  });
});
