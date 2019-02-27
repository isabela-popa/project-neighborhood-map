import React, { Component } from 'react';
import './App.css';
import * as MapService from './services/MapService';
import PlacesList from './components/PlacesList';
import { searchPlaces } from './services/SearchService';

class App extends Component {

  state = {
    placesResults: [],
    highlights: [], // Separate array so we do not interfere with places object
  }

  // Places list (all of them)
  allPlaces = [];

  // DOM Elements
  // Cached, without triggering render
  sideListEl;
  mapEl;

  // Google api
  map;
  markers = [];

  render() {
    console.log('+++ App render');
    let { placesResults, highlights } = this.state;
    // console.log('+++ this.markers', this.markers);

    return (
      <div className="app">

        {/* Header */}
        <header id="header">
          <a id="header-menu" onClick={(e) => this.toggleMenu(e)}>
            {/* Source: Web foundations - Common Responsive Patterns - Lesson 14 */}
            <svg xmlns="http://www.w3.org/TR/SVG" viewBox="0 0 24 24">
              <path d="M2 6h20v3H2zm0 5h20v3H2zm0 5h20v3H2z" />
            </svg>
          </a>
          <h1 id="header-title">
            Tourist Attractions in Jassy
          </h1>
        </header>

        <div className="content">

          {/* Navigator */}
          <nav id="sidelist">
            <PlacesList
              places={placesResults}
              highlights={highlights}
              onSearch={query =>
                this.searchPlacesAndUpdateMarkersOnMap(this.allPlaces, query)
              }
              onClick={(place, i) =>
                this.selectPlaceAndRenderDetails(place, i)
              } />
          </nav>

          {/* Map */}
          <main id="map" />

        </div>

      </div>
    );
  }

  componentDidMount() {
    console.log('+++ App componentDidMount');
    this.cacheDomElems();
    this.initMapsAndLocations();
  }

  /** Wait for gmaps and places to be ready (async both of them) */
  initMapsAndLocations() {
    console.log('+++ initMapsAndLocations');
    Promise.all([
      MapService.getAllPlaces(),
      this.setupGoogleMapsApi(),
    ])
      .then(([places]) => {
        console.log('+++ PROMISE ALL OK initMapsAndLocations ');

        // Update map
        this.updateMarkersOnMap(places);

        // Cache initial data for places
        this.allPlaces = places;

        // Add highlights
        let highlights = places.map(() => false);

        // Update navigator
        this.setState({ placesResults: places, highlights });
      });
  }

  // ====== Map ======

  setupGoogleMapsApi() {
    console.log('+++ setup PROMISE setupGoogleMapsApi');
    MapService.loadGoogleMapService( // async
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyD6RR0E71krN0b40PtcY6Imbf7Bgp4y6qg&callback=gmapsApiReady"
    );

    let promise = new Promise(resolve => {

      console.log('+++ window.gmapsApiReady DECLARATION ( sync code stops here)');
      window.gmapsApiReady = () => {
        console.log('+++ gmapsApiReady EXECUTION (aysnc - it means google maps is finished)');
        this.map = MapService.initGmapsApiAndPlaceMapInDom()
        resolve();
      };

    });

    promise
      .then(() => {
        console.log('+++ PROMISE OK setupGoogleMapsApi');
      })

    return promise;
  }

  searchPlacesAndUpdateMarkersOnMap(places, query) {
    console.log('+++ \n\n');
    console.log('+++ searchPlacesAndUpdateMarkersOnMap');

    let placesResults = searchPlaces(places, query);

    // Update navigator (virtual dom)
    this.setState({ placesResults })

    // Manually update gmaps (pure js, maps does not know about our react app)
    // TODO Implement react gmaps component (https://www.npmjs.com/package/react-google-maps)
    this.updateMarkersOnMap(placesResults);
  }

  selectPlaceAndRenderDetails(place, i) {
    console.log('+++ selectPlaceAndRenderDetails'/* , place */);

    // Update navigator (virtual dom)
    this.highlightPlace(i);

    // Manually update gmaps
    MapService.populateInfoWindow(place._marker);

    // Animate the marker when clicked
    MapService.toggleAnimationOnMarker(place._marker);

  }

  highlightPlace(i) {
    let places = this.state.placesResults;
    let highlights = places.map(() => false);
    highlights[i] = true;

    this.setState({ highlights });
  }

  updateMarkersOnMap(places) {
    console.log('+++ updateMarkersOnMap (places)');

    // Delete existing markers
    this.deleteMarkersOnMap();

    // Create Markers. Avoid extra rendering, no setState.
    this.markers = MapService.generateMapMarkers(places, this.map);

    // Markers tooltips
    MapService.setupTooltipsForMarkers(this.markers, this.selectPlaceAndRenderDetails.bind(this));
  }

  deleteMarkersOnMap() {
    console.log('+++ deleteMarkersOnMap');
    this.markers.forEach(marker => marker.setMap(null));
  }

  // ====== Navigator ======

  cacheDomElems() {
    console.log('+++ cacheDomElems');
    this.sidelistEl = document.getElementById('sidelist');
    this.mapEl = document.getElementById('map');
    console.dir(this.sidelistEl);
  };

  /** Toggle the sidelist when the menu icon is clicked. */
  toggleMenu(e) {
    e.stopPropagation();
    this.sidelistEl.classList.toggle('sidelist-close');
    this.mapEl.classList.toggle('map-full');
  }

}

export default App;