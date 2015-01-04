/**
 * Created by vu on 1/3/15.
 */

angular.module('prodriver').
controller(
'MapController', ['$scope', '$http', function ($scope, $http) {
  $scope.isActive = function (viewLocation) {
    return viewLocation === $location.path();
  };
//  $scope.latitude = 41;
//  $scope.longitude = -77;
//  $scope.map = {
//    center: {
//      latitude:41,
//      longitude: 77
//    },
//    zoom: 14,
//    mapTypeId: google.maps.MapTypeId.ROADMAP
//  };
  $scope.visible = false;

//  $scope.$watch("visible", function(newvalue) {
//    $timeout(function() {
//      map = $scope.myGoogleMap.refresh();
//    }, 0);
//  });
  $scope.drivers = [];
  $scope.refresh = $http.get('/drivers').success(
  function (drivers) {
    $scope.drivers = drivers;
    drivers.forEach(function(driver){
      if (driver.isalert){
        driver.backgroundcolor = 'red';
      }
    })
    console.log("Results: " + $scope.drivers);
  }
  );
  $scope.updateMap = function (driver) {
    console.log("User click on driver: " + driver.firstname)
    var mapOptions = {
      zoom:   12,
      center: new google.maps.LatLng(driver.latitude,driver.longtitude)
      //center: new google.maps.LatLng(37, -115)

    }

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    var info = {
      lat:  parseFloat(driver.latitude),
      long: parseFloat(driver.longtitude),
      message: "This is a test marker"
    }
    createMarker(info)
  }
  var mapOptions = {
    zoom:   12,
    center: new google.maps.LatLng(37, -115)
    //mapTypeId: google.maps.MapTypeId.ROADMAP
  }

  $scope.$on(
  '$viewContentLoaded', function () {
    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }
  );

  $scope.markers = [];

  var infoWindow = new google.maps.InfoWindow();

  var createMarker = function (info) {

    var marker = new google.maps.Marker(
    {
      map:      $scope.map,
      position: new google.maps.LatLng(info.lat, info.long),
      title:    info.message
    }
    );
    marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';

    google.maps.event.addListener(
    marker, 'click', function () {
      infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
      infoWindow.open($scope.map, marker);
    }
    );

    $scope.markers.push(marker);

  }


  $scope.openInfoWindow = function (e, selectedMarker) {
    e.preventDefault();
    google.maps.event.trigger(selectedMarker, 'click');
  }

}]
);