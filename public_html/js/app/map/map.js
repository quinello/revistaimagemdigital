/* global console:false, google:false */
/*jshint unused:false */
'use strict';

app.controller('MapCtrl', ['$scope', '$http', function($scope, $http) {

        $scope.myMarkers = [];
        //$scope.myStyle = [{"featureType": "landscape", "stylers": [{"saturation": -100}, {"lightness": 65}, {"visibility": "on"}]}, {"featureType": "poi", "stylers": [{"saturation": -100}, {"lightness": 51}, {"visibility": "simplified"}]}, {"featureType": "road.highway", "stylers": [{"saturation": -100}, {"visibility": "simplified"}]}, {"featureType": "road.arterial", "stylers": [{"saturation": -100}, {"lightness": 30}, {"visibility": "on"}]}, {"featureType": "road.local", "stylers": [{"saturation": -100}, {"lightness": 40}, {"visibility": "on"}]}, {"featureType": "transit", "stylers": [{"saturation": -100}, {"visibility": "simplified"}]}, {"featureType": "administrative.province", "stylers": [{"visibility": "off"}]}, {"featureType": "water", "elementType": "labels", "stylers": [{"visibility": "on"}, {"lightness": -25}, {"saturation": -100}]}, {"featureType": "water", "elementType": "geometry", "stylers": [{"hue": "#ffff00"}, {"lightness": -25}, {"saturation": -97}]}];
        $scope.myStyle = [{"featureType":"water","stylers":[{"color":"#46bcec"},{"visibility":"on"}]},{"featureType":"landscape","stylers":[{"color":"#f2f2f2"}]},{"featureType":"road","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]}]
        var makersInicializado = false;
        var revista = this;
        revista.estabelecimentos = [];
        
        var infoWindow = new google.maps.InfoWindow();

        $http.get('json/estabelecimentos.json').success(function(data) {
            revista.estabelecimentos = data;
        });

        $scope.loadMakers = function() {

            if (!makersInicializado) {

                for (var i = 0; i < revista.estabelecimentos.length; i++) {
                    var marker = new google.maps.Marker({
                        map: $scope.myMap,
                        icon: 'img/icons/icon_vermelho.png',
                        title: revista.estabelecimentos[i].nome,
                        position: new google.maps.LatLng(revista.estabelecimentos[i].lat, revista.estabelecimentos[i].lng)
                    });

                    marker.content = '<div class="badge">' + '<h5>' + revista.estabelecimentos[i].nome + '</h5>' + '<h6>' + revista.estabelecimentos[i].endereco + ' / ' + revista.estabelecimentos[i].telefone + '</h6><small>' + revista.estabelecimentos[i].segment + '</small></div>';
                              
                    $scope.myMarkers.push(marker);

                }
                makersInicializado = true;
            }
            ;
        };

        $scope.mapOptions = {
            center: new google.maps.LatLng(-21.5971451, -46.8890597),
            zoom: 17,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: $scope.myStyle
        };

        $scope.setZoomMessage = function(zoom) {
            $scope.zoomMessage = 'You just zoomed to ' + zoom + '!';
            console.log(zoom, 'zoomed');
        };

        $scope.openInfoWindow = function(e, selectedMarker) {
            e.preventDefault();
            infoWindow.setContent(selectedMarker.content);
            infoWindow.open($scope.myMap, selectedMarker);
        };

        $scope.setMarkerPosition = function(marker, lat, lng) {
            marker.setPosition(new google.maps.LatLng(lat, lng));
        };

    }]);

app.directive('uiEvent', ['$parse',
    function($parse) {
        return function($scope, elm, attrs) {
            var events = $scope.$eval(attrs.uiEvent);
            angular.forEach(events, function(uiEvent, eventName) {
                var fn = $parse(uiEvent);
                elm.bind(eventName, function(evt) {
                    var params = Array.prototype.slice.call(arguments);
                    //Take out first paramater (event object);
                    params = params.splice(1);
                    fn($scope, {$event: evt, $params: params});
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                });
            });
        };
    }]);