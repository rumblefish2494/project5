var model = {
	area: {
		city: 'Reno',
		state: 'Nevada',
		coordinates: {
			center: {
				lat: 39.5579311,
				lng: -119.8508414
			},
			zoom: 8
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
var viewModel = {
	render: function() {
	this.places = ko.observableArray([]);
	},
	init: function() {

	}
};

//ko.applyBindings(new viewModel());

function initialize() {
		    console.log('in initialize');

		    var mapOptions = squid.getCoordinates();
		    console.log(mapOptions);
		 	var map = new google.maps.Map(document.getElementById('map-canvas'),
		            mapOptions);
		 	$('#map-canvas').append(map);
};

/*window.onload = function() {
	console.log('in onload');
	initialize();
};*/
$().ready(initialize);
//window.addEventListener('ready', initialize);
//google.maps.event.addDomListener(window, 'load', initialize);


