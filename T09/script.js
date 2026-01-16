/*
    César Sánchez Martín
*/

let map = L.map('map').setView([40.4168, -3.7038], 6);

// Capa del mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

const latInput = document.getElementById('lat');
const lngInput = document.getElementById('lng');

let ubicaciones = JSON.parse(localStorage.getItem('ubicaciones')) || [];

// Mostrar coordenadas al mover el ratón
map.on('mousemove', function (e) {
    latInput.value = e.latlng.lat.toFixed(5);
    lngInput.value = e.latlng.lng.toFixed(5);
});

// Guardar ubicación al hacer click
map.on('click', function (e) {
    const punto = {
        lat: e.latlng.lat,
        lng: e.latlng.lng
    };

    ubicaciones.push(punto);
    localStorage.setItem('ubicaciones', JSON.stringify(ubicaciones));

    L.marker([punto.lat, punto.lng]).addTo(map);
    dibujarCanvas();
});

// Cargar ubicaciones guardadas al iniciar
ubicaciones.forEach(p => {
    L.marker([p.lat, p.lng]).addTo(map);
});

// ---------- CANVAS ----------
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function dibujarCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ubicaciones.forEach((punto, index) => {
        // Normalizamos valores para que entren en el canvas
        const x = (punto.lng + 180) * (canvas.width / 360);
        const y = (90 - punto.lat) * (canvas.height / 180);

        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = 'blue';
        ctx.fill();

        ctx.fillText(index + 1, x + 6, y - 6);
    });
}

// Dibujar al cargar la página
dibujarCanvas();
