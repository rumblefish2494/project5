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
		},
		{
			name: 'Reef Sushi',
			address: '50 N Sierra St, Reno, NV',
			phone: '775.800.1388'
		},
		{
			name: '4th St. Bistro',
			address: '3065 W 4th St, Reno, NV',
			phone: '775.323.3200'
		},
		{
			name: 'Sup Restaurant',
			address: '669 S Virginia St, Reno, NV',
			phone: '775.324.4787'
		},
		{
			name: "BJ's BBQ",
			address: '80 E Victorian Ave, Sparks, NV'
		},
		{
			name: 'Beaujolais',
			address: '753 Riverside Dr, Reno, NV'
		},
		{
			name: 'Pegs Glorified Ham N Eggs',
			address: '6300 Mae Anne Ave, Reno, NV'
		},
		{
			name: 'Centro Bar & Kitchen',
			address: '236 California Ave, Reno, NV'
		},
		{
			name: "The Brewer's Cabinet",
			address: '475 S Arlington Ave, Reno, NV'
		},
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
	var queryTextPreamble = 'https://api.foursquare.com/v2/venues/search?query=';
	var venueTextPreamble = 'https://api.foursquare.com/v2/venues/';
	var clientIdSecret = '&client_id=5GCBYWBXFXKG2X0KPKQE4YLOBPD2PYX1RRRE11EGRDG41WBW&client_secret=JQGGN4IDCCFZZW1A4HQFY513DIC4N3AJETVXVK0ZNFBLPLYA';
	var yyyymmdd = '&v=' + ymd;

	//for infoWindow used in showDetails()
	var iwContent;

	self.venue;
	self.categories = ko.observableArray([]);
	self.showMe = ko.observable(false);
	self.img = ko.observable('');
	self.imgText = ko.observable('');
	self.photos = [];
	self.restaurantName = ko.observable('');
	self.restaurantAddress = ko.observable('');
	self.restaurantPhone = ko.observable('');
	self.restaurantStatus = ko.observable('');
	self.restaurantHours = ko.observable('');
	self.menuUrl = ko.observable('');
	self.menuText = ko.observable('');
	self.websiteUrl = ko.observable('');
	self.websiteText = ko.observable('');
	self.filterText = ko.observable("");
	self.places = ko.observableArray(model.places);

	//add a visible switch to obsevrable array
	self.places().forEach(function(place){
		place.showRestaurant = ko.observable(true);
	});

	//process input form search box to filter through restaurants
	self.filterRestaurant = function() {
		this.places().forEach(function(place){
			uppercaseName = place.name.toUpperCase();
			if( uppercaseName.indexOf(self.filterText().toUpperCase()) == 0) {
				place.showRestaurant(true);
				place.marker.setMap(map);
			}
			else {
				place.showRestaurant(false);
				place.marker.setMap(null);
			};
		});
	};

	self.displayDetails = function(place) {

		var fourSquareVenueId;
		categories([]);
		self.img('');
		self.showMe(false);
		self.menuUrl('');
		self.menuText('');
		self.websiteUrl('');
		self.websiteText('');
		self.restaurantName('');
		self.restaurantAddress('');
		self.restaurantPhone('');
		self.restaurantStatus('');

		//ajax get foursquare venu ID in order to obtaen complete venue information object
		$.ajax({
			url: queryTextPreamble + place.name + '&near=' + place.address + '&intent=match' + clientIdSecret
			       + yyyymmdd,
			dataType: 'json',
			success: function(data) {
				if(data.response.venues[0] != undefined ) {
					getFoursquareObject(fourSquareVenueId = data.response.venues[0].id + '?', place);
					console.log(place.response);
					//once venue ID is obtained run another ajax request to get the complete object for that venue
				} else {
				fourSquareError();
				};
			},
			error: function(){
					fourSquareError();
			}
		});
	};

	self.getFoursquareObject = function(fourSquareVenueId, place) {
		$.ajax({
			url: venueTextPreamble + fourSquareVenueId + clientIdSecret
					+ yyyymmdd,
			dataType: 'json',
			success: function(data){

				venue = data.response.venue;
				showMe(true);
				self.restaurantName(venue.name);
				console.log(venue);

				if( 'menu' in venue ) {
					menuUrl(venue.menu.url);
					menuText( place.name.toString() + ' Menu' );
				} else {
					menuUrl('');
					menuText( 'No menu registered on FourSquare' );
				};

				if('bestPhoto' in venue ) {
					img(venue.bestPhoto.prefix + '350x275' + venue.bestPhoto.suffix);
				} else {
					img('');
					imgText('No Image available');
				};

				if('url' in venue ){
					websiteUrl(venue.url);
					websiteText('Website');
				} else {
					websiteUrl('');
					websiteText('No website registered on FourSquare');
				};

				if( 'address' in  venue.location ) {
					self.restaurantAddress( venue.location.address + ', ' +	 venue.location.city );
				} else {
					self.restaurantAddress( venue.location.city );
				};

				if( 'hours' in venue ) {
					self.restaurantStatus(venue.hours.status);
				};

				self.restaurantPhone(venue.contact.formattedPhone);


				//go through foursquare array for category of restaurants
				//collect all listed for use in app
				venue.categories.forEach(function(venueCategory){
					category = venueCategory.shortName;
					self.categories.push(category);
				});
			},
			error: function(){
				fourSquareError();
			}
		});

	};

	self.fourSquareError = function() {
		self.restaurantStatus('Foursquare is not currently available');
	};

	self.showMarkerWindow = function(data) {
		data.infowindow.content = '<div id="content">' + '<h4 class="heading">' + data.name + '</h4></div>';
		data.infowindow.open(map, data.marker);
	};
	self.hideMarkerWindow = function(data, element) {
		data.infowindow.close(map, data.marker);
	};
};

//initialize google map using model coordinates
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
		        //create listener to show info on marker click
		        google.maps.event.addListener(marker, 'click', function() {
			    	$('li:contains(' + marker.title + ')').trigger('click');
			    	console.log(marker.title)
			  	});

		        google.maps.event.addListener(marker, 'mouseover', function() {
			    	$('li:contains(' + marker.title + ')').trigger('mouseover');
			    	console.log(marker.title)
			  	});

			  	google.maps.event.addListener(marker, 'mouseout', function() {
			    	$('li:contains(' + marker.title + ')').trigger('mouseout');
			    	console.log(marker.title)
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



