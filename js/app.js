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

var squid = {
	getCoordinates: function() {
		return model.area.coordinates;
	}
};
var viewModel = function (){
	var self = this;
	this.inputFilter = ko.observable("");
	this.filterList = ko.observable("");

	console.log(this.filterList());
	this.displayRestaurant = ko.observable(true);
	this.filterText = ko.observable("");
	this.places = ko.observableArray(model.places);
	this.places().forEach(function(place){
		//console.log(self.places.indexOf(place));
		$('.bindMe').append('<li data-bind=' + '"' + 'visible: displayRestaurant'  +'"' + '>' + place.name + '</li>');
	});
	//console.log(self.places()[0]);
	this.displayRestaurant = function() {

	};
	//process inpuf from search box to filter through restaurants
	this.filterRestaurant = function() {
		console.log('search activated: ' + self.filterText());
		//return true;

	};

};
var init = function() {
	initializeMap();
	//viewModel();

};


ko.applyBindings(viewModel);

function initializeMap() {
	var mapOptions = squid.getCoordinates();
	var map = new google.maps.Map(document.getElementById('map-canvas'),
		         mapOptions);
	$('#map-canvas').append(map);

};

//initialize google map
$().ready(init);



