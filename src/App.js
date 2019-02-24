import React, { Component } from 'react';
import './App.css';
import * as MapService from './services/MapService';
import PlacesList from './components/PlacesList';
import { searchPlaces } from './services/SearchService';

class App extends Component {

  state = {
    placesResults: [],
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
    let { placesResults } = this.state;

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
              onSearch={(query) =>
                this.searchPlacesAndUpdateMarkersOnMap(this.allPlaces, query)
              } />
          </nav>

          {/* Map */}
          <main id="map" />

        </div>

      </div>
    );
  }

  componentDidMount() {
    this.cacheDomElems();
    this.initMapsAndLocations();
  }

  /** Wait for gmaps and places to be ready (async both of them) */
  initMapsAndLocations() {
    Promise.all([
      MapService.getAllPlaces(),
      this.setupGoogleMapsApi(),
    ])
      .then(([places]) => {

        // Update map
        this.updateMarkersOnMap(places);

        // Cache initial data for places
        this.allPlaces = places;

        // Update navigator
        this.setState({ placesResults: places });
      });
  }

  // ====== Map ======

  setupGoogleMapsApi() {
    MapService.loadGoogleMapService(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyD6RR0E71krN0b40PtcY6Imbf7Bgp4y6qg&callback=gmapsApiReady"
    );

    let promise = new Promise(resolve => {

      window.gmapsApiReady = () => {
        this.map = MapService.initGmapsApiAndPlaceMapInDom()
        resolve();
      };

    });

    return promise;
  }

  searchPlacesAndUpdateMarkersOnMap(places, query) {
    let placesResults = searchPlaces(places, query);

    // Update navigator
    this.setState({ placesResults })

    // Update gmaps
    this.updateMarkersOnMap(placesResults);
  }

  updateMarkersOnMap(places) {

    // Delete existing markers
    this.deleteMarkersOnMap();

    // Create Markers
    this.markers = MapService.generateMapMarkers(places, this.map);

    // Markers tooltips
    MapService.setupTooltipsForMarkers(this.markers);
  }

  deleteMarkersOnMap() {
    this.markers.forEach(marker => marker.setMap(null));
  }

  // ====== Navigator ======

  cacheDomElems() {
    this.sidelistEl = document.getElementById('sidelist');
    this.mapEl = document.getElementById('map');
  };

  /** Toggle the sidelist when the menu icon is clicked. */
  toggleMenu(e) {
    e.stopPropagation();
    this.sidelistEl.classList.toggle('sidelist-close');
    this.mapEl.classList.toggle('map-full');
  }

}

export default App;