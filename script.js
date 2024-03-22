document.addEventListener('DOMContentLoaded', function() {
    function getPrefectures() {
        fetch('https://geoapi.heartrails.com/api/json?method=getPrefectures')
            .then(response => response.json())
            .then(data => {
                const prefectures = data.response.prefecture;
                displayButtons(prefectures, 'prefecture');
            })
            .catch(error => console.error('Error fetching prefectures:', error));
    }
    
    // 市区町村一覧を取得する関数
    function getCities(prefecture) {
        fetch(`https://geoapi.heartrails.com/api/json?method=getCities&prefecture=${encodeURIComponent(prefecture)}`)
            .then(response => response.json())
            .then(data => {
                const cities = data.response.location;
                displayButtons(cities, 'city');
            })
            .catch(error => console.error('Error fetching cities:', error));
    }
    
    // 町名一覧を取得する関数
    function getTowns(city) {
        fetch(`https://geoapi.heartrails.com/api/json?method=getTowns&city=${encodeURIComponent(city)}`)
            .then(response => response.json())
            .then(data => {
                const towns = data.response.location;
                displayButtons(towns, 'town');
            })
            .catch(error => console.error('Error fetching towns:', error));
    }
    
    // 街区符号一覧を取得する関数
    function getStreets(town) {
        fetch(`https://geoapi.heartrails.com/api/json?method=getStreets&town=${encodeURIComponent(town)}`)
            .then(response => response.json())
            .then(data => {
                const streets = data.response.location;
                displayButtons(streets, 'street');
            })
            .catch(error => console.error('Error fetching streets:', error));
    }
    
    // 住居番号一覧を取得する関数
    function getNumbers(street) {
        fetch(`https://geoapi.heartrails.com/api/json?method=getNumbers&street=${encodeURIComponent(street)}`)
            .then(response => response.json())
            .then(data => {
                const numbers = data.response.location;
                displayButtons(numbers, 'number');
            })
            .catch(error => console.error('Error fetching numbers:', error));
    }
    
    // ロケーション選択関数
    function selectLocation(location, level) {
        selectedLocation.push(location);
        const nextLevel = getNextLevel(selectedLocation.length);
        if (nextLevel) {
            switch (nextLevel) {
                case 'city':
                    getCities(location);
                    break;
                case 'town':
                    getTowns(location);
                    break;
                case 'street':
                    getStreets(location);
                    break;
                case 'number':
                    getNumbers(location);
                    break;
                default:
                    break;
            }
        } else {
            displayMap(selectedLocation);
        }
    }
    
});
