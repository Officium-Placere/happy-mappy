// import React from 'react';

// import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

// mapboxgl.accessToken = 'pk.eyJ1IjoiYXBwbGVtdWZmaW4iLCJhIjoiY2xjdmFzZmppMDYwMTNxbW92dTBhYTZrdSJ9.NMqeTpj0UTSYGlOzAsBAAw';

// export default class App extends React.PureComponent {

//   constructor(props) {
//     super(props);
//     this.state = {
//       lng: -70.9,
//       lat: 42.35,
//       zoom: 9
//     };
//     this.mapContainer = React.createRef();
//   }

//   componentDidMount() {
//     const { lng, lat, zoom } = this.state;
//     const map = new mapboxgl.Map({
//       container: this.mapContainer.current,
//       style: 'mapbox://styles/mapbox/streets-v12',
//       center: [lng, lat],
//       zoom: zoom
//     });
//   }

//   render() {
//     return (
//       <div>
//         <div ref={this.mapContainer} className="map-container" />
//       </div>
//     );
//   }

// }
//! above is react class component code


import React, { useRef, useEffect, useState } from 'react';

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoiYXBwbGVtdWZmaW4iLCJhIjoiY2xjdmFzZmppMDYwMTNxbW92dTBhYTZrdSJ9.NMqeTpj0UTSYGlOzAsBAAw';

export default function App() {

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  //initialize the map
  useEffect(() => {

    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });
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
        <h1>test</h1>
        <div ref={mapContainer} className="map-container" />
      </div>
    </>
  );

}