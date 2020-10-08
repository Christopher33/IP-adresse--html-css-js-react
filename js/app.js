const itemSearch = document.getElementById("search");
const form = document.getElementById("ipForm");
const results = document.getElementById("results");

const ipAddress = document.querySelector(".ipAddress");
const local = document.getElementById("location");
const timezone = document.getElementById("timezone");
const isp = document.getElementById("isp");

let ipResult;
let newIpResult;
let data = '';
let mymap;

let persoIcon = L.icon({
    iconUrl: 'images/icon-location.svg',
});

itemSearch.addEventListener('input', (e) => {
    data = e.target.value;
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    ipSearch();
});

const fetchIp = async() => {
    const ipKey = 'at_lrRdOQfyUqyjklo7iGcx27OX3590Q';

    ipResult = await fetch(`https://geo.ipify.org/api/v1?apiKey=${ipKey}&ipAddress=${data}`)
    .then(res => res.json())
    .then(ipResult => {
        newIpResult = ipResult;
        if(newIpResult.code === 422){
            alert("This is not a valid IP adress.")
            ipAddress.innerHTML = "";
            local.innerHTML = "";
            timezone.innerHTML = "";
            isp.innerHTML = "";
            itemSearch.value = "";
        } else {

        };
    })
    .catch(error => {
        alert("There was a problem retrieving the result, please try agoin.");
        console.log(error);
    })
};

const mapFind = (newIpResult) => {
    if(mymap){
        mymap.remove();
    };
    const lat = newIpResult.location.lat;
    const long = newIpResult.location.lng;

    mymap = L.map('mapid', {
        center: [(lat - 0.02), long],
        zoom: 11,
        zoomControl: false
    });
    L.marker([lat, long], {icon: persoIcon}).addTo(mymap);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiY2hyaXMzMzk4MCIsImEiOiJja2Z5MjY0NWcwMmExMnZueXRlcHBneHdkIn0.g2f3VXQ-DfaFS2gAi2dysw'
    }).addTo(mymap);
}

const result = newIpResult => {
    ipAddress.innerHTML = newIpResult.ip;
    local.innerHTML = `${newIpResult.location.city}, ${newIpResult.location.region}`;
    timezone.innerHTML = `UTC ${newIpResult.location.timezone}`;
    isp.innerHTML = newIpResult.isp;
}

const ipSearch = async() => {
    await fetchIp(data);
    result(newIpResult);
    mapFind(newIpResult);
}

const init = (() => {
    ipSearch();
})();


