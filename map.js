let map;
let clickedLatLng;

const pinsData = [
    {
        lat: 51.54537981922461,
        lng: -0.19436882648666753,
        author: "GuruGamer",
        description: "True Sect HQ",
        dateAdded: "19-12-2023",
        image: "media/content/pictures/G_logo.jpg"
    },
    // Add more pins here
];

function initMap() {
    var grayscaleStyle = [
        {
            "featureType": "all",
            "stylers": [
                { "saturation": -100 },
                { "lightness": 50 }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                { "lightness": 100 },
                { "visibility": "simplified" }
            ]
        }
    ];
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: {lat: 51.5074, lng: -0.1278},
        styles: grayscaleStyle
    });

    map.addListener('rightclick', function(e) {
        clickedLatLng = e.latLng;
        showPinForm(e.pixel);
    });

    pinsData.forEach(pin => {
        addPinToMap(pin.lat, pin.lng, pin.author, pin.description, pin.dateAdded, pin.image);
    });
}

function showPinForm(pixel) {
    const form = document.getElementById('pinForm');
    form.style.display = 'block';
    form.style.left = pixel.x + 'px';
    form.style.top = pixel.y + 'px';

    document.getElementById('pinLat').value = clickedLatLng.lat();
    document.getElementById('pinLng').value = clickedLatLng.lng();
}

document.getElementById('addPin').addEventListener('click', function() {
    showPinForm({ x: event.clientX, y: event.clientY });
});

function addPinToMap(lat, lng, author, description, dateAdded, image) {
    const marker = new google.maps.Marker({
        position: { lat: lat, lng: lng },
        map: map,
        icon: {
            url: 'media/content/pictures/G_logo.jpg',
            scaledSize: new google.maps.Size(40, 40)
        }
    });

    const infoWindowContent = `<div>
                                <img src="${image}" alt="Pin Image" style="width: 100px; height: auto;">
                                <p><b>Creator:</b> ${author}<br>
                                <b>Description:</b> ${description}<br>
                                <small><b>Date Added:</b> ${dateAdded}</small></p>
                              </div>`;

    const infoWindow = new google.maps.InfoWindow({
        content: infoWindowContent
    });

    marker.addListener('mouseover', function() {
        infoWindow.open(map, marker);
    });

    marker.addListener('mouseout', function() {
        infoWindow.close();
    });
}
