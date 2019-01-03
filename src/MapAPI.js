
// Load the Google Maps JavaScript API
export function loadGoogleMapsApi(googleMapsApiUrl) {
    const scriptTag = document.createElement("script");
    scriptTag.src = googleMapsApiUrl;
    scriptTag.async = true;
    scriptTag.defer = true;
    document.body.appendChild(scriptTag);
}

const foursquareApi = 'https://api.foursquare.com/v2/';
const headers = {
    'Accept': 'application/json'
};

export const getAllPlaces = () =>
    fetch(`${foursquareApi}venues/search?near=Jassy,Romania&radius=15000&categoryId=4deefb944765f83613cdba6e,4bf58dd8d48988d136941735,4bf58dd8d48988d137941735,52e81612bcbc57f1066b7a22,52e81612bcbc57f1066b7a13,52e81612bcbc57f1066b7a14,4eb1d4dd4b900d56c88a45fd,4bf58dd8d48988d165941735,52e81612bcbc57f1066b7a32,4bf58dd8d48988d12d941735,4bf58dd8d48988d132941735,52e81612bcbc57f1066b7a40&client_id=YIPK42FTF2OQBMDQID4GC1P4FEHZY52NOP2VIQO4BTXP4Q01&client_secret=SVP12TF5XYOZIX3P5HBVZFRE2ER0PDCTGTKYVB0R2PU3MXO0&v=20181216`, { headers })
        // .then(response => {debugger;})
        .then(response => response.json())
        // .then(data => {debugger;})
        .then(data => data.response.venues)
        // .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error("ERROR!!!", error));





