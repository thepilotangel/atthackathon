/**
 * Created by vu on 10/29/14.
 */
angular.module('prodriver').
controller(
'NavbarCtrl', ['$scope','$location',function ($scope,$location) {
  this.user = "dpdUserStore";
  $scope.isActive = function (viewLocation) {
    return viewLocation === $location.path();
  };
}]
);