var model = {
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

//used for maps to query model etc.
var squid = {
	getCoordinates: function() {
		return model.area.coordinates;
	},
	getLocations: function() {
		return model.places;
	},
	addMarker: function(marker, infoWindow, index) {
		console.log(marker + infoWindow + index);
		model.places[index].marker = marker;
		model.places[index].infoWindow = infoWindow;
	},
	addInfo: function(info, index) {

	}
};


var viewModel = function (){
	var self = this;
	var uppercaseName;


	self.filterText = ko.observable("");
	self.places = ko.observableArray(model.places);

	//add a visible switch to obsevrable array
	self.places().forEach(function(place){
		place.showRestaurant = ko.observable(true);
	});
	//	$('.bindMe').append('<li data-bind=' + '"' + 'visible: displayRestaurant'  +'"' + '>' + place.name + '</li>');
	//console.log(self.places()[0]);
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

				console.log(place);
			}
			else {
				place.showRestaurant(false);
				place.marker.setMap(null);
				//place.marker.setAnimation(null);
				console.log(place);
			};
		});
	};

	self.showDetails = function(data) {

		data.marker.setAnimation(google.maps.Animation.BOUNCE);
		data.infoWindow.open(map, data.marker);
		//$(element).addClass('highlight');
		//console.log('element');
		//console.log('in showDetails');

	};
	self.hideDetails = function(data, element) {
		//alert('out of showRestaurant');
		data.marker.setAnimation(null);
		data.infoWindow.close(map, data.marker);
	};
};


//initialize google map using model coordinates
//var markers = [];
var geocoder;
var map
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
		        //markers.push(marker);
		        squid.addMarker(marker, infowindow, index);
		    } else {
		        alert("Geocode was not successful for the following reason: " + status);
		    }
        });
	});
};

function createInfo() {

};


//initialize google map
$().ready(initializeMap, ko.applyBindings(viewModel));



