# project5
Udacity Front End Web Developer Project 5 - Neighborhood Map
Brian Harlin
7/28/15

==================================================================
OVERVIEW (TL;DR)
==================================================================
This is a map for locally owned great restaurants as decided by me!
Upon load the full list of restaurants is present.
User can filter results via search to narrow list and markers down.
hovering over item in list highlights location on map with info window.
clicking on list item brings up foursquare information availablef for that location.
same is also true for map markers regarding hover and click.
ENJOY GOOD FOOD!

===================================================================
INSTRUCTIONS:
===================================================================
You can download or fork the repository from https://github.com/rumblefish2494/project5
Once the files are loaded on your machine or server:

launch the index.html file in your browser by either double clicking on the file in
your file explorer or opening the file from your browser using file/open file (or similar, depending on browser ).
  
Upon load you should see a search input field, a list of local Reno, NV restaurants, and a google map of Reno with markers for each restaurant in the list.

Entering text in the search input area will filter both the restaurant list and the markers on the map.

Hovering over either list item or marker will display marker's info window showing the name of the restaurant
this will help identify what part of town the restaurant is in on mousover.

Clicking on either a restaurant list item or it's corresponding map marker will trigger a request for available
Foursquare information about the restaurant that will then be displayed on screen.

Not all restaurants have complete information registered in Foursquare, so you may not see the same information
for each restaurant. The app seeks to gather the following about a restaurant:

  1) Image - using Foursquare's registered 'best image'. if one is not available, the display will indicate as such.
  2) Restaurant name
  3) Current status of restaurant - using Foursquares 'hours: {status: value}' if present, if not available this will     not display.
  4) Address - using Foursquare's registered 'venue.location: { address: value } + venue.location: { city: value }
    information will only display if it is registered in Foursquare for this venue.
  5) Phone - using Foursquare's registered 'venue.contact: {formattedPhone: value }. Information will only display if     it is registered in Foursquare for this venue.
  6) A link to the restaurants website using Fouresquare's regisered 'url'. if not available, app will display a 
    message indicating that a website is not registered in Foursquare for this site.
  7) A link to the menu for the restaurant using Foursquare's registered 'menu'. if not available, app will display a 
    message indicating that a meng is not registered in Foursquare for this site.


  


