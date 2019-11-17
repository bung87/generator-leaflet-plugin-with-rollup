import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
var map = L.map('map').setView([51.505, -0.09], 5);
map.zoomControl.setPosition('topright');
map.addLayer(new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    { attribution: 'Map data <a href="http://openstreetmap.org">OpenStreetMap</a> contributors' }
));