angular.module('WITPhoneApp.controllers', [])

    .controller('StaffCtrl', function (StaffList, $scope, $timeout) {
        var staffList = window.localStorage['staff_list'];
        if(staffList) {
            $scope.staff = StaffList.all();
        } else {
            // get all staff
            StaffList.all().then(function (response) {
                // save all staff to local storage
                StaffList.save(response);
                $scope.staff = StaffList.all();
            });
        }

        // pull-down to refresh - get the list, then save it first
        $scope.doRefresh = function () {
            window.localStorage.removeItem('staff_list');
            StaffList.all().then(function (response) {
                StaffList.save(response);
                $scope.staff = StaffList.all();
                console.log("Updated");
            });
        };

        // Refresh nav-button
        $scope.refreshStaffList = function () {
            $scope.StaffList = StaffList;
            StaffList.isUpdating = true;

            // remove saved data from local storage
            window.localStorage.removeItem('staff_list');
            StaffList.all().then(function (response) {
                StaffList.save(response);
                $scope.staff = StaffList.all();
                // slow down the UI
                $timeout(function () {
                    StaffList.isUpdating = false;
                }, 1000);

            });
        };

        function getStaffList() {
            StaffList.all().success(function (response) {
                StaffList.save(angular.toJson(response));
                $scope.staff = response;

                // Update local store list
                StaffList.update($scope.staff).then(function (newStaffList) {
                    // Promise was resolved. List needs updating!
                    $scope.staffList = newStaffList;
                }, function () {
                    // Promise was rejected. No update needed!
                    $scope.flash = {
                        hasMessage: true,
                        message: "No updates available."
                    };

                    $timeout(function () {
                        $scope.flash = { hasMessage: false};
                    }, 2000);
                });
            });
        }
    })

    .controller('StaffDetailCtrl', function ($scope, $stateParams, StaffList, $cordovaContacts, $ionicPopup, $timeout) {

        staffList = angular.fromJson(window.localStorage['staff_list']);
        var person = {};
        if (staffList) {
            $scope.person = person = StaffList.get($stateParams.staffId, staffList);
        } else {
            StaffList.all().success(function (response) {
                $scope.person = StaffList.get($stateParams.staffId, response);
            })
        }

        $scope.saveContact = function () {
            var contactName = person.title;
            // store contact phone numbers in ContactField[]
            var phoneNumbers = [];
            phoneNumbers[0] = new ContactField('work', "+353" + person.directory_external_phone, true); // preferred number

            $cordovaContacts.save({"displayName": contactName, "phoneNumbers": phoneNumbers})
                .then(function (result) {
                    // saved
                    var contactSavedPopup = $ionicPopup.show({
                        title: 'WIT Staff Directory',
                        template: 'Contact saved.'
                    });
                    $timeout(function() {
                        contactSavedPopup.close(); //close the popup after 3 seconds for some reason
                    }, 1000);
                }, function (error) {
                    // not saved
                });
        };
    });
