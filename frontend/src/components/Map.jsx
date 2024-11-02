import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from "leaflet";

const Map = ({ center, zoom, popupCoords, popupText }) => {
  useEffect(() => {
    // Initialize the map if it hasn't been initialized already
    const map = L.map('map').setView(center, zoom);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Custom icon setup
    const customIcon = L.icon({
      iconUrl: '/stock.svg', // Path to your custom icon image
      iconSize: [80, 40],    // Size of the icon
      iconAnchor: [0, 0],  // Point of the icon that aligns with marker location
      popupAnchor: [0, 0], // Popup position relative to icon
    });

    // Add a marker with a popup text
    const marker = L.marker(popupCoords, { icon: customIcon }).addTo(map)
      .bindTooltip(popupText, {
        permanent: false,
        direction: "top",
        offset: [0, -10],
      });

    // Cleanup function to remove map instance on unmount
    return () => map.remove();
  }, [center, zoom, popupCoords, popupText]); // Depend on prop values for updates

  return (
    <div id="map" style={{ height: "100%", width: "100%" }}></div>
  );
};

export default Map;
