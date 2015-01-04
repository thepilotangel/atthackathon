/**
 * Created by vu on 1/3/15.
 */
angular.module('prodriver').
controller(
'HistoryController', ['$scope',function ($scope) {
  $scope.isActive = function (viewLocation) {
    return viewLocation === $location.path();
  };
}]
);