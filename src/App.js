import React, { Component } from 'react';
import './App.css';
import * as MapAPI from './MapAPI';
import SearchPlaces from './SearchPlaces';


class App extends Component {
  state = {
    places: [],
    markers: []
    // sidelistOpen: true
  }

  componentDidMount() {
    this.getPlaces();
  }

  getPlaces = () => {
    MapAPI.getAllPlaces()
      .then(places => {
        this.setState({ places });
      })
      .then(() => this.loadMapsApi());
  }

  // Load Google Maps JavaScript API
  loadMapsApi = () => {
    MapAPI.loadGoogleMapsApi("https://maps.googleapis.com/maps/api/js?key=AIzaSyD6RR0E71krN0b40PtcY6Imbf7Bgp4y6qg&callback=createMap");
    window.createMap = this.createMap;
  }

  // Create a new map
  createMap = () => {
    let newMap = new window.google.maps.Map(document.getElementById('map'), {
      // center: { lat: 47.158455, lng: 27.601442 },
      center: { lat: 47.1584549, lng: 27.6014418 },
      // center: { lat: 47.156944, lng: 27.590278 },
      // center: { lat: 47.162222, lng: 27.588889 },
      zoom: 13
    });

    // Create an info window instance
    let largeInfowindow = new window.google.maps.InfoWindow();

    // Adjust the boundaries of the map to fit listings that may be outside the initial zoom area
    let bounds = new window.google.maps.LatLngBounds();

    // Use the places array to create an array of markers on initialize.
    for (var i = 0; i < this.state.places.length; i++) {
      // Get the position from the places array.
      let position = { lat: this.state.places[i].location.lat, lng: this.state.places[i].location.lng };
      let title = this.state.places[i].name;
      // Create a marker per location, and put into markers array.
      let marker = new window.google.maps.Marker({
        map: newMap,
        position: position,
        title: title,
        animation: window.google.maps.Animation.DROP,
        id: this.state.places[i].id
      });
      // Push the marker to the array of markers.
      this.state.markers.push(marker);
      // Extend the boundaries of the map for every marker that is made
      bounds.extend(marker.position);
      // Create an onclick event to open an infowindow at each marker.
      marker.addListener('click', () => this.populateInfoWindow(marker, largeInfowindow));
      // Tell the map to fit itself to the bounds
      marker.map.fitBounds(bounds);
    }
  }

  // Populate the infowindow when the marker is clicked. It will be only allowed
  // one infowindow which will open at the marker that is clicked, and populate based
  // on that markers position.
  populateInfoWindow = (marker, infowindow) => {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker !== marker) {
      infowindow.marker = marker;
      infowindow.setContent('<div>' + marker.title + '</div>');
      infowindow.open(marker.map, marker);
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick', () => infowindow.setMarker = null);
    }
  }

  // Toggle the sidelist when the menu icon is clicked.
  toggleMenu = (e) => {
    // let menu = document.getElementById('header-menu');
    let sidelist = document.getElementById('sidelist');

    sidelist.classList.toggle('sidelist-close');
    e.stopPropagation();
    // this.setState({
    //   sidelistOpen: !this.state.sidelistOpen
    // })

    // menu.addEventListener('click', function() {
    //   sidelist.classList.remove('sidelist-close');
    // });
  }

  render() {
    return (
      <div className="app">
        <header id="header">
          <a id="header-menu" onClick={(e) => this.toggleMenu(e)}>
            {/* Web foundations - Common Responsive Patterns - Lesson 14 */}
            <svg xmlns="http://www.w3.org/TR/SVG" viewBox="0 0 24 24">
              <path d="M2 6h20v3H2zm0 5h20v3H2zm0 5h20v3H2z" />
            </svg>
          </a>
          <h1 id="header-title">
            Tourist Attractions in Jassy
          </h1>
        </header>
        <nav id="sidelist">
          <SearchPlaces places={this.state.places} />
        </nav>
        <main id="map">
        </main>
      </div>
    );
  }
}

export default App;
