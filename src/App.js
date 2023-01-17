import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import "./styles/styles.scss";

//* to add: geocoding + markers (https://docs.mapbox.com/mapbox-gl-js/example/marker-from-geocode/)
//* permanence? logins?
//* cool isotope grid?

mapboxgl.accessToken = 'pk.eyJ1IjoiYXBwbGVtdWZmaW4iLCJhIjoiY2xjdmFzZmppMDYwMTNxbW92dTBhYTZrdSJ9.NMqeTpj0UTSYGlOzAsBAAw';

export default function App() {

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(Math.floor(Math.random() * (90 - (-90))) + (-90));
  const [lat, setLat] = useState(Math.floor(Math.random() * (45 - (-45))) + (-45));
  const [zoom, setZoom] = useState(2);
  const button = useRef(null)

  // const thresholdChecker = (lng, lat) => {
  //   const coordinates = [0, 0];

  //   if (lng < -180 || lng > 180) {
  //     coordinates.splice(0, 0, (Math.floor(Math.random() * (90 - (-90))) + (-90)))
  //   } else (coordinates.splice(0, 0, lng))

  //   if (lat < -90 || lat > 90) {
  //     coordinates.splice(0, 0, (Math.floor(Math.random() * (45 - (-45))) + (-45)))
  //   } else (coordinates.splice(0, 0, lat))

  //   return coordinates;
  // }

  //initialize map
  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });

    //add fullscreen button
    map.current.addControl(new mapboxgl.FullscreenControl());
    //add 3d buildings
    map.current.on('style.load', () => {
      // Insert the layer beneath any symbol layer.
      const layers = map.current.getStyle().layers;
      const labelLayerId = layers.find(
        (layer) => layer.type === 'symbol' && layer.layout['text-field']
      ).id;

      map.current.addLayer(
        {
          'id': 'add-3d-buildings',
          'source': 'composite',
          'source-layer': 'building',
          'filter': ['==', 'extrude', 'true'],
          'type': 'fill-extrusion',
          'minzoom': 15,
          'paint': {
            'fill-extrusion-color': '#aaa',

            // Use an 'interpolate' expression to
            // add a smooth transition effect to
            // the buildings as the user zooms in.
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'height']
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'min_height']
            ],
            'fill-extrusion-opacity': 0.6
          }
        },
        labelLayerId
      );
    });

    //reset button when globe spin ends
    map.current.on('moveend', () => {
      button.current.innerHTML = 'Try again!';
    })
  });

  //get coordinates on user interaction with map
  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  const revolutionSpeed = .5;
  let spinEnabled = false;

  function spinGlobe() {
    const time = Math.floor(Math.random() * (5000 - 2000)) + 2000
    const center = map.current.getCenter();

    if (spinEnabled) {
      let distancePerSecond = 360 / revolutionSpeed;
      center.lng += distancePerSecond
      center.lat = Math.floor(Math.random() * (90 - (-90))) + (-90);
    }

    map.current.easeTo({ center, duration: time, easing: (n) => n });
  }

  const handleBtn = () => {
    spinEnabled = !spinEnabled;

    if (spinEnabled) {
      spinGlobe();
      button.current.innerHTML = 'Finding...';
    }
    spinEnabled = !spinEnabled
  };

  return (
    <>
      <div className="wrapper">
        <button id="btn-spin" ref={button} onClick={() => handleBtn()}>Start rotation</button>
        <div className="logoInfo">
          <div className="logoContainer">
            <h1>globe.trotter</h1>
          </div>
          <div className="infoContainer">
            <p>lat/lng/zoom is {lat}, {lng}, {zoom}</p>
          </div>
        </div>
        <div ref={mapContainer} className="map-container" />
      </div>
    </>
  );

}