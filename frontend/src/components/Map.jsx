import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from "leaflet";

const Map = () => {
  useEffect(() => {
    const mapContainer = document.getElementById('map');
    if (mapContainer && mapContainer._leaflet_id) return;

    // Initialize the map
    const map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Custom icon setup
    const customIcon = L.icon({
      iconUrl: '/stock.svg', // Path to your custom icon image
      iconSize: [80, 40], // Set the size of the icon (width, height)
      iconAnchor: [15, 40], // Point of the icon which will correspond to marker's location
      popupAnchor: [25, -40], // Position of the popup relative to the icon
    });

    L.marker([51.5, -0.09], { icon: customIcon }).addTo(map)
      .bindPopup('A pretty CSS popup with a custom icon!')
      .openPopup();
  }, []);

  return (
    <div id="map" style={{ height: "100%", width: "100%" }}></div>
  );
};

export default Map;
