let currentLocation = {
    prefecture: '',
    city: '',
    town: '',
    street: '',
    number: ''
};

function selectLocation(level) {
    const location = prompt(`Enter ${level}:`);
    if (location) {
        currentLocation[level] = location;
        updateMap();
    }
}

function updateMap() {
    const address = Object.values(currentLocation).filter(val => val !== '').join(', ');
    const mapUrl = `https://www.openstreetmap.org/search?query=${address}#map=15`;
    document.getElementById('map').innerHTML = `<iframe width="100%" height="100%" src="${mapUrl}" frameborder="0"></iframe>`;
}
