# Neighborhood Map (React)

I have developed a `single-page application using React` featuring a `map of Jassy city, Romania`. I have added additional functionality to this map including: `map markers` to identify `popular locations or places`, various ways to browse the content, such as a `search function` to easily discover these locations and a `list view` to support simple browsing of all locations. Then I have implemented `third-party APIs` that provide additional information about each of those locations.

## App Functionality

* The Neighborhood Map project uses [Google Maps API](https://developers.google.com/maps/documentation/) mapping system, which `displays map markers` identifying `tourist attraction locations in Jassy city located in Romania`.
* This app `displays those locations by default` when the page is loaded.
* It has implemented a `list view of the set of locations` mentioned above.
* Also, the app provides a `filter option` that uses an input field to filter both:
    * The `list view`
    * The `map markers` displayed by default on load.

    The list view and the markers update accordingly in real time.

* Neighborhood Map app contains functionality using `third-party APIs` to provide information when a map marker or list view entry is clicked. In this case, the API used comes from [Foursquare](https://developer.foursquare.com/).

* All application components (i.e., search box, list view, the map) render on-screen in a `responsive manner`. The list view can be hidden from a hamburger menu icon on the small screen of a mobile.

* Selecting a location via list item or map marker causes the `map marker to bounce`. This indicates that the location has been selected, and an `associated info window` opens above the map marker with additional information about that location.

* The list of locations is `filterable with a text input`. Filtering the list also filters the markers on the map.

## How to run

To get started using the app:

* save this project to you computer, using the `Clone or download` button found in the upper right-hand side of this project's page,
* in the terminal, cd into the `project's directory` on your computer,
* install all project dependencies with `npm install` and
* start the development server with `npm start`.

After that, the project should load automatically in your browser at http://localhost:3000/.

When available in the browser, the app uses a `service worker` to cache responses to requests for site assets. Visited pages are rendered when there is no network access. This can be tested only in the production mode of the app, which is built using command `npm run build` to the `build` folder.

## Create React App
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This project is the last of the 8 projects to complete in the Front-End Web Developer Nanodegree Program and was built from scratch,without any existing starter code to rely on.