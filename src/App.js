import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { loadGoogleMapsApi } from './MapAPI';

class App extends Component {
  componentDidMount() {
    this.loadMapsApi();
  }

  // Load Google Maps JavaScript API
  loadMapsApi = () => {
    loadGoogleMapsApi("https://maps.googleapis.com/maps/api/js?key=AIzaSyD6RR0E71krN0b40PtcY6Imbf7Bgp4y6qg&v=3&callback=createMap");
    window.createMap = this.createMap;
  }

  // Create a new map
  createMap = () => {
    let newMap = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 47.158455, lng: 27.601442 },
      zoom: 13
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
