// Load the Google Maps JavaScript API
export function loadGoogleMapsApi(googleMapsApiUrl) {
    const scriptTag = document.createElement("script");
    scriptTag.src = googleMapsApiUrl;
    scriptTag.async = true;
    scriptTag.defer = true;
    document.body.appendChild(scriptTag);
}


