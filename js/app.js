var model = {
	//get yyyymmdd for foursquare versioning api request
	date: function() {
		var today = new Date();
		year = today.getFullYear().toString();
		day = today.getDate() < 10 ? '0' + today.getDate().toString() : today.getDate().toString();
		month = today.getMonth() < 10 ? '0' + today.getMonth().toString() : today.getMonth().toString();;
		return year + month + day;
	},
	area: {
		city: 'Reno',
		state: 'Nevada',
		coordinates: {
			center: {
				lat: 39.5579311,
				lng: -119.8508414
			},
			zoom: 12
		}
	},

	places: [
		{
			name: 'Campo',
			address: '50 N Sierra St, Reno, NV',
			phone: '775.737.9555'
		},
		{
			name: 'Stone House Cafe',
			address: '1907 S Arlington Ave, Reno, NV',
			phone: '775.284.3895'
		},
		{
			name: 'LuLou'+"'s",
			address: '1470 S Virginia St, Reno, NV',
			phone: '775.329.9979'
		}
	]
};

//controller used for maps - model interfacing etc.
//udacity webcast said not to try to wrap map in knockout
var squid = {
	getCoordinates: function() {
		return model.area.coordinates;
	},
	getLocations: function() {
		return model.places;
	},
	addMarker: function(marker, infowindow, index) {
		//console.log(marker + infoWindow + index);
		model.places[index].marker = marker;
		model.places[index].infowindow = infowindow;
	},
	addInfo: function(info, index) {

	}
};


var viewModel = function (){
	var self = this;
	var uppercaseName;
	var ymd = model.date();

	//for infoWindow used in showDetails()
	var iwContent;


	self.filterText = ko.observable("");
	self.places = ko.observableArray(model.places);

	//add a visible switch to obsevrable array
	self.places().forEach(function(place){
		place.showRestaurant = ko.observable(true);
	});

	self.displayRestaurant = function(string) {
		console.log('search activated: ' + self.filterText());
	};

	//process input form search box to filter through restaurants
	self.filterRestaurant = function() {
		this.places().forEach(function(place){
			uppercaseName = place.name.toUpperCase();
			if( uppercaseName.indexOf(self.filterText().toUpperCase()) == 0) {
				place.showRestaurant(true);
				place.marker.setMap(map);
				console.log(place);
				//place.marker.setAnimation(google.maps.Animation.BOUNCE);
			}
			else {
				place.showRestaurant(false);
				place.marker.setMap(null);
				//place.marker.setAnimation(null);
			};
		});
	};

	self.showFourSquare = function(place) {
		console.log('inFourSquare!');
		console.log(place);

		var queryTextPreamble = 'https://api.foursquare.com/v2/venues/search?query=';
		var clientIdSecret = '&client_id=5GCBYWBXFXKG2X0KPKQE4YLOBPD2PYX1RRRE11EGRDG41WBW&client_secret=JQGGN4IDCCFZZW1A4HQFY513DIC4N3AJETVXVK0ZNFBLPLYA'
		var yyyymmdd = '&v=' + ymd;
		$.getJSON( queryTextPreamble + place.name + '&near=' + place.address + clientIdSecret
			+ yyyymmdd, function(data){
			console.log(data);
		});
	};

	self.showDetails = function(data) {

		console.log(data.infowindow.content);
		data.marker.setAnimation(google.maps.Animation.BOUNCE);
		data.infowindow.content = '<div id="content">' + '<h4 class="heading">' + data.name + '</h4></div>';
		console.log(data.infowindow.content);
		data.infowindow.open(map, data.marker);


	};
	self.hideDetails = function(data, element) {

		//alert('out of showRestaurant');

		data.marker.setAnimation(null);
		data.infowindow.close(map, data.marker);
	};
};


//initialize google map using model coordinates
//var markers = [];
var geocoder;
var map;
var infowindow;
function initializeMap() {
	var mapOptions = squid.getCoordinates();
	geocoder = new google.maps.Geocoder();
	map = new google.maps.Map(document.getElementById('map-canvas'),
		         mapOptions);
	$('#map-canvas').append(map);
	getMarkers();

};

function getMarkers(){
	var locations = squid.getLocations();
	locations.forEach(function(location, index){
		geocoder.geocode( { 'address': location.address}, function(results, status) {
		    if (status == google.maps.GeocoderStatus.OK) {
		      	var marker = new google.maps.Marker({
		            map: map,
		            position: results[0].geometry.location,
		            animation: google.maps.Animation.DROP,
		            title: location.name
				});

		        var infowindow = new google.maps.InfoWindow({
      				content: ''

		        });

		        squid.addMarker(marker, infowindow, index);
		    } else {
		        alert("Geocode was not successful for the following reason: " + status);
		    };
        });
	});

};

function createInfo() {

};


//initialize google map
$().ready(initializeMap, ko.applyBindings(viewModel));



