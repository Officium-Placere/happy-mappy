
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
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(3);

  //initialize map
  useEffect(() => {

    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });

    //! very interesting - show gaby when you enter it in the other useEffect
    map.current.addControl(new mapboxgl.FullscreenControl());
    //! use ref allows targeting map in react - tell gaby
    map.current.on("load", ()=> {

    })


    //! now this works???
    map.current.on('style.load', () => {
      // Insert the layer beneath any symbol layer.
      const layers = map.current.getStyle().layers;
      const labelLayerId = layers.find(
        (layer) => layer.type === 'symbol' && layer.layout['text-field']
      ).id;

      // The 'building' layer in the Mapbox Streets
      // vector tileset contains building height data
      // from OpenStreetMap.
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







    // The following values can be changed to control rotation speed:

    // At low zooms, complete a revolution every two minutes.
    const secondsPerRevolution = 2;
    // Above zoom level 5, do not rotate.
    const maxSpinZoom = 4;
    // Rotate at intermediate speeds between zoom levels 3 and 5.
    const slowSpinZoom = 2;

    let userInteracting = false;
    let spinEnabled = false;

    function spinGlobe() {
      const zoom = map.current.getZoom();
      if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
        let distancePerSecond = 360 / secondsPerRevolution;
        if (zoom > slowSpinZoom) {
          // Slow spinning at higher zooms
          const zoomDif =
            (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
          distancePerSecond *= zoomDif;
        }
        const center = map.current.getCenter();
        center.lng -= distancePerSecond;
        // Smoothly animate the map over one second.
        // When this animation is complete, it calls a 'moveend' event.
        map.current.easeTo({ center, duration: 1000, easing: (n) => n });
      }
    }

    // Pause spinning on interaction
    map.current.on('mousedown', () => {
      userInteracting = true;
    });

    // Restart spinning the globe when interaction is complete
    map.current.on('mouseup', () => {
      userInteracting = false;
      spinGlobe();
    });

    // These events account for cases where the mouse has moved
    // off the map, so 'mouseup' will not be fired.
    map.current.on('dragend', () => {
      userInteracting = false;
      spinGlobe();
    });
    map.current.on('pitchend', () => {
      userInteracting = false;
      spinGlobe();
    });
    map.current.on('rotateend', () => {
      userInteracting = false;
      spinGlobe();
    });

    // When animation is complete, start spinning if there is no ongoing interaction
    map.current.on('moveend', () => {
      spinGlobe();
    });

    document.getElementById('btn-spin').addEventListener('click', (e) => {
      spinEnabled = !spinEnabled;
      if (spinEnabled) {
        spinGlobe();
        e.target.innerHTML = 'Pause rotation';
      } else {
        map.current.stop(); // Immediately end ongoing animation
        e.target.innerHTML = 'Start rotation';
      }
    });

    spinGlobe();























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

  

  
  return (
    <>
      <div className="wrapper">
        <button id="btn-spin">Start rotation</button>
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