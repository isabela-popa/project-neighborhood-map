

const foursquareApi = 'https://api.foursquare.com/v2/';
const headers = {
    'Accept': 'application/json'
};

export function getAllPlaces() {
    return fetch(`${foursquareApi}venues/search?near=Jassy,Romania&radius=4200&categoryId=4deefb944765f83613cdba6e,` +
        `4bf58dd8d48988d136941735,4bf58dd8d48988d137941735,52e81612bcbc57f1066b7a22,52e81612bcbc57f1066b7a13,` +
        `52e81612bcbc57f1066b7a14,4eb1d4dd4b900d56c88a45fd,4bf58dd8d48988d165941735,52e81612bcbc57f1066b7a32,` +
        `4bf58dd8d48988d12d941735,52e81612bcbc57f1066b7a40&client_id=YIPK42FTF2OQBMDQID4GC1P4FEHZY52NOP2VIQO4BTXP4Q01` +
        `&client_secret=SVP12TF5XYOZIX3P5HBVZFRE2ER0PDCTGTKYVB0R2PU3MXO0&v=20181216`, { headers })
        .then(response => response.json())
        .then(data => data.response.venues)
        .catch(error => {
            console.error("Cannot read for square data", error);
            // renderWarningTooltip('Cannot get places from Foursquare.')
        });
}

export function loadGoogleMapService(googleMapServiceUrl) {
    const scriptTag = document.createElement("script");
    scriptTag.src = googleMapServiceUrl;
    scriptTag.async = true;
    scriptTag.defer = true;
    document.body.appendChild(scriptTag);
}

export function initGmapsApiAndPlaceMapInDom() {
    let mapEl = document.getElementById('map');
    let mapCfg = {
        center: { lat: 47.1584549, lng: 27.6014418 },
        zoom: 13
    };

    let map = new window.google.maps.Map(mapEl, mapCfg);

    return map;
}

export function generateMapMarkers(places, map) {
    let markers = [];

    for (var i = 0; i < places.length; i++) {

        // Marker position
        let position = { lat: places[i].location.lat, lng: places[i].location.lng };
        let title = places[i].name;

        // Create a marker per location, and put into markers array.
        let marker = new window.google.maps.Marker({
            map, position, title,
            animation: window.google.maps.Animation.DROP,
            id: places[i].id
        });

        markers.push(marker);
    }

    return markers;
}

/** Tooltips can be optional on markers. */
export function setupTooltipsForMarkers(markers) {

    // Create an info window instance
    let largeInfowindow = new window.google.maps.InfoWindow();

    // Adjust the boundaries of the map to fit listings that may be outside the initial zoom area
    let bounds = new window.google.maps.LatLngBounds();

    markers.forEach(marker => {

        // Extend the boundaries of the map for every marker that is made
        bounds.extend(marker.position);

        // Create an onclick event to open an infowindow at each marker.
        marker.addListener('click', () => populateInfoWindow(marker, largeInfowindow));

        // Tell the map to fit itself to the bounds
        marker.map.fitBounds(bounds);

    });

    // If only one marker, then show tooltip
    if (markers.length === 1) {
        populateInfoWindow(markers[0], largeInfowindow);
    }
}

/**
 * Populate the infowindow when the marker is clicked. It will be only allowed
 * one infowindow which will open at the marker that is clicked, and populate based
 * on that markers position.
 */
export function populateInfoWindow(marker, infowindow) {

    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker !== marker) {
        infowindow.marker = marker;
        infowindow.setContent('<div>' + marker.title + '</div>');
        infowindow.open(marker.map, marker);

        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener('closeclick', () => infowindow.setMarker = null);
    }

}




