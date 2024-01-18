let map;
let clickedLatLng;
const LONG_PRESS_DURATION = 800;
let longPressTimer = null;

const pinsData = [
    {
        lat: 51.54537981922461,
        lng: -0.19436882648666753,
        vandaliser: "GuruGamer",
        description: "True Sect HQ",
        dateAdded: "19-12-2023",
    },
    {
        lat: 51.488963019495195,
        lng: -0.1337243044834624,
        vandaliser: "GuruGamer",
        description: "Pimlico Station",
        dateAdded: "16-01-2024",
    }
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

    map.addListener('touchstart', function(e) {
        longPressTimer = setTimeout(function() {
            // Assuming the first touch point is the desired point
            const touchPoint = e.touches[0];
            clickedLatLng = map.getProjection().fromPointToLatLng(new google.maps.Point(touchPoint.clientX, touchPoint.clientY));
            showPinForm({ x: touchPoint.clientX, y: touchPoint.clientY });
        }, LONG_PRESS_DURATION);
    });
    
    map.addListener('touchend', function() {
        if (longPressTimer) {
            clearTimeout(longPressTimer);
            longPressTimer = null;
        }
    });

    pinsData.forEach(pin => {
        addPinToMap(pin.lat, pin.lng, pin.vandaliser, pin.description, pin.dateAdded);
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

function addPinToMap(lat, lng, vandaliser, description, dateAdded) {
    const marker = new google.maps.Marker({
        position: { lat: lat, lng: lng },
        map: map,
        icon: {
            url: 'media/content/pictures/G_logo.jpg',
            scaledSize: new google.maps.Size(40, 40)
        }
    });

    const infoWindowContent = `<div>
                                <p><b>Vandaliser:</b> ${vandaliser}<br>
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

function getMapOffset(element) {
    let x = 0;
    let y = 0;
    while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {
        x += element.offsetLeft - element.scrollLeft;
        y += element.offsetTop - element.scrollTop;
        element = element.offsetParent;
    }
    return { top: y, left: x };
}

document.addEventListener('click', function(event) {
    var isClickInsideForm = document.getElementById('pinForm').contains(event.target);
    var isContextMenu = document.getElementById('contextMenu').contains(event.target);

    if (!isClickInsideForm && !isContextMenu) {
        document.getElementById('pinForm').style.display = 'none';
    }
});
