

const foursquareApi = 'https://api.foursquare.com/v2/';
const headers = {
    'Accept': 'application/json'
};

// Private vars
let infowindow;
let bounds;

export function getAllPlaces() {
    console.log('+++ setup PROMISE getAllPlaces ( sync code stops here)');
    return fetch(`${foursquareApi}venues/search?near=Jassy,Romania&radius=4200&categoryId=4deefb944765f83613cdba6e,` +
        `4bf58dd8d48988d136941735,4bf58dd8d48988d137941735,52e81612bcbc57f1066b7a22,52e81612bcbc57f1066b7a13,` +
        `52e81612bcbc57f1066b7a14,4eb1d4dd4b900d56c88a45fd,4bf58dd8d48988d165941735,52e81612bcbc57f1066b7a32,` +
        `4bf58dd8d48988d12d941735,52e81612bcbc57f1066b7a40&client_id=YIPK42FTF2OQBMDQID4GC1P4FEHZY52NOP2VIQO4BTXP4Q01` +
        `&client_secret=SVP12TF5XYOZIX3P5HBVZFRE2ER0PDCTGTKYVB0R2PU3MXO0&v=20181216`, { headers })
        .then(response => response.json())
        .then(data => data.response.venues)
        .then(venues => {
            console.log('+++ PROMISE OK getAllPlaces venues (async)', venues);
            return venues;
        })
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

    setupMapsUtils();

    let mapEl = document.getElementById('map');
    let mapCfg = {
        center: { lat: 47.1584549, lng: 27.6014418 },
        zoom: 13
    };

    let map = new window.google.maps.Map(mapEl, mapCfg);

    return map;
}

export function generateMapMarkers(places, map) {
    console.log('+++ generateMapMarkers');
    let markers = [];

    for (var i = 0; i < places.length; i++) {

        // Marker position
        let position = { lat: places[i].location.lat, lng: places[i].location.lng };
        let place = places[i]
        // console.log('place', place);
        let title = place.name;

        // Create a marker per location, and put into markers array.
        let marker = new window.google.maps.Marker({
            map, position, title,
            animation: window.google.maps.Animation.DROP,
            id: places[i].id,
            _place: place, // Easy reference for later
        });

        // Easy reference for later
        place._marker = marker;

        markers.push(marker);
    }

    return markers;
}

export function toggleAnimationOnMarker(marker) {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
    }
    setTimeout(() => { marker.setAnimation(null) }, 800);
}

/** Tooltips can be optional on markers. */
export function setupTooltipsForMarkers(markers, callback) {
    console.log('+++ setupTooltipsForMarkers');

    markers.forEach((marker, i) => {

        // Extend the boundaries of the map for every marker that is made
        bounds.extend(marker.position);

        // Create an marker onclick event to open an infowindow at each marker.
        marker.addListener('click', () => callback(marker._place, i));

        // Tell the map to fit itself to the bounds
        marker.map.fitBounds(bounds);

    });

    // If only one marker, then show tooltip
    let onlyOneResultVisible = markers.length === 1;
    if (onlyOneResultVisible) {
        console.log('+++ onlyOneResultVisible');
        populateInfoWindow(markers[0]);
    }
}

/**
 * Populate the infowindow when the marker is clicked. It will be only allowed
 * one infowindow which will open at the marker that is clicked, and populate based
 * on that markers position.
 */
export function populateInfoWindow(marker, place) {
    console.log('+++ populateInfoWindow');

    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker !== marker) {
        infowindow.marker = marker;
        infowindow.setContent(
            '<div>' + marker.title + '</div>' +
            '<img alt="' + marker.title + '" src="' + place.categories[0].icon.prefix +
            'bg_' + 64 + place.categories[0].icon.suffix + '" />' +
            '<description>' + place.categories[0].name + '</description>' +
            '<div>' + place.location.formattedAddress + '</div>'
        );
        infowindow.open(marker.map, marker);

        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener('closeclick', () => infowindow.setMarker = null);
    }

}

// ====== PRIVATE ======

function setupMapsUtils() {

    // Create an info window instance
    infowindow = new window.google.maps.InfoWindow();

    // Adjust the boundaries of the map to fit listings that may be outside the initial zoom area
    bounds = new window.google.maps.LatLngBounds();
}




