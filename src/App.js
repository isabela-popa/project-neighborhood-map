import React, { Component } from 'react';
import './App.css';
import * as MapAPI from './MapAPI';


class App extends Component {
  state = {
    places: []
  }
  componentDidMount() {
    this.loadMapsApi();
    this.getPlaces();
  }

  getPlaces = () => {
    MapAPI.getAllPlaces().then(places => {
      this.setState({ places });
    });
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
    let palaceOfCulture = { lat: 47.15739, lng: 27.58695 };
    let pointMarker = new window.google.maps.Marker({
      position: palaceOfCulture,
      map: newMap,
      title: 'Palace of Culture'
    });
    let pointInfowindow = new window.google.maps.InfoWindow({
      content: '<strong>Palace of Culture</strong><br/>The Palace has 298 large rooms with a total area of 34,236 m2 (368,510 sq ft), 92 windows in the front part of the building and another 36 inside the building.'
    });
    pointMarker.addListener('click', () => {
      pointInfowindow.open(newMap, pointMarker);
    });
  }







  render() {
    return (
      <div className="App">
        <main id="map">
          {/* <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a> */}
        </main>
      </div>
    );
  }
}

export default App;
