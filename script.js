document.addEventListener('DOMContentLoaded', function() {
    const selectedLocation = [];

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
    
    // ボタン表示関数
    function displayButtons(dataArray, level) {
        const buttonsContainer = document.getElementById('buttonsContainer');
        buttonsContainer.innerHTML = '';
        dataArray.forEach(item => {
            const button = document.createElement('button');
            button.textContent = item;
            button.addEventListener('click', () => selectLocation(item, level));
            buttonsContainer.appendChild(button);
        });
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

    // 次のレベルを取得する関数
    function getNextLevel(level) {
        const levels = ['prefecture', 'city', 'town', 'street', 'number'];
        return levels[level];
    }

    // 地図表示関数
    function displayMap(locationArray) {
        const address = locationArray.join(', ');
        const mapUrl = `https://www.openstreetmap.org/search?query=${address}#map=15`;
        document.getElementById('map').innerHTML = `<iframe width="100%" height="100%" src="${mapUrl}" frameborder="0"></iframe>`;
    }

    // 初期表示: 都道府県一覧を表示
    getPrefectures();
});
