/**
 * Created by vu on 1/3/15.
 */
angular.module('prodriver', ['ngRoute','dpdCollection','ngTable','toaster','ngCsv','google-maps'])
.config(
['$routeProvider', function ($routeProvider) {
  $routeProvider.when(
  '/map_controller', {
    templateUrl:  'templates/map_controller.html',
    controller:   'MapController'
  }
  ).
  when(
  '/history_controller', {
    templateUrl:  'templates/history_controller.html',
    controller:   'HistoryController'
  }
  ).
  otherwise({redirectTo: '/map_controller'});
}]
)