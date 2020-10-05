const itemSearch = document.getElementById("search");
const form = document.getElementById("ipForm");
const results = document.getElementById("results");

const ipAddress = document.getElementById("ipAddress");
const local = document.getElementById("location");
const timezone = document.getElementById("timezone");
const isp = document.getElementById("isp");

let ipResult;
let data = '8.8.8.8';

const fetchIp = async() => {

    ipResult = await fetch(`https://geo.ipify.org/api/v1?apiKey=at_lrRdOQfyUqyjklo7iGcx27OX3590Q&ipAddress=${data}`).then(res => res.json());
    
}

const fieldUp = ipResult => {
    ipAddress.innerHTML = ipResult.ip;
    local.innerHTML = `${ipResult.location.city}, ${ipResult.location.region}`;
    timezone.innerHTML = `UTC ${ipResult.location.timezone}`;
    isp.innerHTML = ipResult.isp;
}

itemSearch.addEventListener('input', (e) => {
    data = e.target.value;
})


form.addEventListener('submit', (e) => {
    console.log(data);
})

fetchIp();
