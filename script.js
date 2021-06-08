(() => {
    const ipAdressDOM = document.querySelector('.ip-address p')
    const locationDOM = document.querySelector('.location p')
    const timezoneDOM = document.querySelector('.timezone p')
    const ispDOM = document.querySelector('.ISP p')
    const input = document.querySelector('input')
    
    const api = {
        key: 'at_gHcZH7HRfzy5qKo559lzGHDAjStj5',
        url: `
        https://geo.ipify.org/api/v1?`
    }

    sendInputValue()
    
    const searchButton = document.querySelector('.search-btn')
    input.addEventListener('keyup', (e) => {
        if (e.key == 'Enter') {
            sendInputValue()
        }
    })

    searchButton.addEventListener('click', () => {
        sendInputValue()
    })

    function sendInputValue() {
        if (input.value == '') {
        fetch(`${api.url}apiKey=${api.key}`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                displayData(data)
                displayMap(data)
                console.log(data);
            })
        } else {
            fetch(`${api.url}apiKey=${api.key}&ipAddress=${input.value}
            `)
                .then(res => {
                    if (res.ok) {
                        return res.json()
                    }
                    else {
                        alert('IP not valid')
                    }
                })
                .then(data => {
                    displayData(data)
                    displayMap(data)
                })
    }
    }
    

    function displayData(data) {
        ipAdressDOM.innerText = data.ip;
        locationDOM.innerText = `${data.location.city}, ${data.location.country}`
        timezoneDOM.innerText = data.location.timezone
        ispDOM.innerHTML = data.isp

    }
    function displayMap(data) {
        const blackIcon = L.icon({
            iconUrl: 'images/icon-location.svg',
            
        
            iconSize:     [46, 56], // size of the icon
            
            iconAnchor:   [23, 0], // point of the icon which will correspond to marker's location
            
            
        });

        const {lat, lng} = data.location
        const map = L.map('map', {
            zoomControl: false
        }).setView([lat, lng], 13);
        

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        
        L.marker([lat, lng], {icon: blackIcon}).addTo(map).openPopup();
            
            
    }
    
})()