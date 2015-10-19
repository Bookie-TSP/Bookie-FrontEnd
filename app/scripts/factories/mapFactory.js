app.factory('googleMap', function ($rootScope) {
	var position = {
		lat: "13.752",
		lng: "100.493",
		address: ""
	};

	function setPosition(latitude, longitude){
		position.lat = latitude;
		position.lng = longitude;
	}

	function initialize() {
		var geocoder = new google.maps.Geocoder;
		var infowindow = new google.maps.InfoWindow;

		var bkk = new google.maps.LatLng(position.lat, position.lng);
		var mapProp = {
			center: bkk,
			zoom: 7,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			disableDefaultUI: true
		};

		var marker = new google.maps.Marker({
			position: bkk,
			draggable: true
		});

		var styles = [{
				"featureType": "landscape",
				"elementType": "labels",
				"stylers": [{
					"visibility": "off"
                }]
            },
			{
				"featureType": "poi",
				"elementType": "labels",
				"stylers": [{
					"visibility": "off"
                }]
            },
			{
				"featureType": "road",
				"elementType": "geometry",
				"stylers": [{
					"lightness": 57
                }]
            },
			{
				"featureType": "road",
				"elementType": "labels.text.fill",
				"stylers": [{
						"visibility": "on"
                },
					{
						"lightness": 24
                }]
            },
			{
				"featureType": "road",
				"elementType": "labels.icon",
				"stylers": [{
					"visibility": "off"
                }]
            },
			{
				"featureType": "transit",
				"elementType": "labels",
				"stylers": [{
					"visibility": "off"
                }]
            },
			{
				"featureType": "water",
				"elementType": "labels",
				"stylers": [{
					"visibility": "off"
                }]
            }
        ];

		var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
		marker.setMap(map);
		map.setOptions({
			styles: styles
		});

		google.maps.event.addListener(marker, 'dragend', function (mark) {
			var latitude = mark.latLng.lat();
			var longitude = mark.latLng.lng();
			geocodeLatLng(geocoder, map, marker, infowindow, latitude, longitude);
			position.lat = latitude.toFixed(3);
			position.lng = longitude.toFixed(3);
			document.getElementById('current')
				.innerHTML = '<p>Marker dropped: Current Lat: ' + latitude.toFixed(3) + ' Current Lng: ' + longitude.toFixed(3) + '</p>';

		});
	}

	// this function is used for convert lat and lng into address
	function geocodeLatLng(geocoder, map, marker, infowindow, latitude, longitude) {
		var latlng = {
			lat: latitude,
			lng: longitude
		};

		geocoder.geocode({
			'location': latlng
		}, function (results, status) {
			if (status === google.maps.GeocoderStatus.OK) {
				if (results[1]) {
					var address = results[1].formatted_address;
					infowindow.setContent(address);
					infowindow.open(map, marker);

					document.getElementById('address')
						.innerHTML = '<p>Current add: ' + address + '</p>';
					position.address = address;
				} else {
					window.alert('No results found');
				}
			} else {
				window.alert('Geocoder failed due to: ' + status);
			}
		});
	}

	function init() {
		google.maps.event.addDomListener(window, 'load', initialize);
		console.log("init");
	}

	// initial map and pin by calling initialize function
	return {
		init: init,
		initialize: initialize,
		geocodeLatLng: geocodeLatLng,
		position: position,
		setPosition: setPosition
	};
});
