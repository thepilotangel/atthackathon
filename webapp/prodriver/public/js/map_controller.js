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
      message: "Driver OK",
      desc: "This driver is under control"
    }
    if(driver.isalert){
      info.message= "Potential Intoxication !!!",
      info.desc="This driver might be under influence"
      info.isalert = true;
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
    if (!info.isalert) {
      marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';
    }else{
      marker.content = '<div id="reparse_helper_'+marker.id +'class="infoWindowContent">'
                       + info.desc +'<br><br>'+
                       '<button onClick='+"location='https://localhost:9001/'"+' style="float: left;padding-left: 20px;background-color: orangered;width: 100px;height: 40px">'+
                          '<i style="padding-right: 10px;font-size= 50px;color: white" class="fa fa-phone"></i>'+
//                            '<span style="color:white;text-align: center">CALL DRIVER</span>'
                       '</button>'+
                       '<button ng-click="triggerEmergency()" style="float: right;padding-right: 20px;background-color: lightyellow;width: 100px;height: 40px">'+
                       '<i style="padding-left:10px;font-size= 50px;color: grey" class="fa fa-warning"></i>'+
//                            '<span style="color:white;text-align: center">CALL DRIVER</span>'
                       '</button>'

                       '</div>';
    }
    $scope.trigger_call = function() {
      alert('Trigger call now');
    }
    $scope.triggerEmergency = function() {
      alert('Trigger Emergency now');
    }
    google.maps.event.addListener(
    marker, 'click', function () {
      infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
      infoWindow.open($scope.map, marker);
    }
    );
    infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
    infoWindow.open($scope.map, marker);
    google.maps.event.addListener(marker.id, 'domready', function(a,b,c,d) {
      onload();});
    $scope.markers.push(marker);


  }


  $scope.openInfoWindow = function (e, selectedMarker) {
    e.preventDefault();
    google.maps.event.trigger(selectedMarker, 'click');
  }
  var onload = function() {
    $scope.$apply(function(){
      $compile(document.getElementById("reparse_helper_"+marker.id))($scope)
    });
  }
}]
);