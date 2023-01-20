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
  const [buttonDisabled, setButtonDisabled] = useState(false)

  const geoJSON = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [139.7744, 35.6839]
        },
        "properties": {
          "city": "Tokyo",
          "city_ascii": "Tokyo",
          "country": "Japan",
          "iso2": "JP",
          "iso3": "JPN",
          "admin_name": "Tōkyō",
          "capital": "primary",
          "population": 39105000,
          "id": 1392685764
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [106.8451, -6.2146]
        },
        "properties": {
          "city": "Jakarta",
          "city_ascii": "Jakarta",
          "country": "Indonesia",
          "iso2": "ID",
          "iso3": "IDN",
          "admin_name": "Jakarta",
          "capital": "primary",
          "population": 35362000,
          "id": 1360771077
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [77.2167, 28.6667]
        },
        "properties": {
          "city": "Delhi",
          "city_ascii": "Delhi",
          "country": "India",
          "iso2": "IN",
          "iso3": "IND",
          "admin_name": "Delhi",
          "capital": "admin",
          "population": 31870000,
          "id": 1356872604
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [120.9833, 14.6000]
        },
        "properties": {
          "city": "Manila",
          "city_ascii": "Manila",
          "country": "Philippines",
          "iso2": "PH",
          "iso3": "PHL",
          "admin_name": "Manila",
          "capital": "primary",
          "population": 23971000,
          "id": 1608618140
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [-46.6339, -23.5504]
        },
        "properties": {
          "city": "São Paulo",
          "city_ascii": "Sao Paulo",
          "country": "Brazil",
          "iso2": "BR",
          "iso3": "BRA",
          "admin_name": "São Paulo",
          "capital": "admin",
          "population": 22495000,
          "id": 1076532519
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [126.9900, 37.5600]
        },
        "properties": {
          "city": "Seoul",
          "city_ascii": "Seoul",
          "country": "South Korea",
          "iso2": "KR",
          "iso3": "KOR",
          "admin_name": "Seoul",
          "capital": "primary",
          "population": 22394000,
          "id": 1410836482
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [72.8775, 19.0758]
        },
        "properties": {
          "city": "Mumbai",
          "city_ascii": "Mumbai",
          "country": "India",
          "iso2": "IN",
          "iso3": "IND",
          "admin_name": "Mahārāshtra",
          "capital": "admin",
          "population": 22186000,
          "id": 1356226629
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [121.4667, 31.1667]
        },
        "properties": {
          "city": "Shanghai",
          "city_ascii": "Shanghai",
          "country": "China",
          "iso2": "CN",
          "iso3": "CHN",
          "admin_name": "Shanghai",
          "capital": "admin",
          "population": 22118000,
          "id": 1156073548
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [-99.1333, 19.4333]
        },
        "properties": {
          "city": "Mexico City",
          "city_ascii": "Mexico City",
          "country": "Mexico",
          "iso2": "MX",
          "iso3": "MEX",
          "admin_name": "Ciudad de México",
          "capital": "primary",
          "population": 21505000,
          "id": 1484247881
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [113.2590, 23.1288]
        },
        "properties": {
          "city": "Guangzhou",
          "city_ascii": "Guangzhou",
          "country": "China",
          "iso2": "CN",
          "iso3": "CHN",
          "admin_name": "Guangdong",
          "capital": "admin",
          "population": 21489000,
          "id": 1156237133
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [31.2358, 30.0444]
        },
        "properties": {
          "city": "Cairo",
          "city_ascii": "Cairo",
          "country": "Egypt",
          "iso2": "EG",
          "iso3": "EGY",
          "admin_name": "Al Qāhirah",
          "capital": "primary",
          "population": 19787000,
          "id": 1818253931
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [116.4075, 39.9040]
        },
        "properties": {
          "city": "Beijing",
          "city_ascii": "Beijing",
          "country": "China",
          "iso2": "CN",
          "iso3": "CHN",
          "admin_name": "Beijing",
          "capital": "primary",
          "population": 19437000,
          "id": 1156228865
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [-73.9249, 40.6943]
        },
        "properties": {
          "city": "New York",
          "city_ascii": "New York",
          "country": "United States",
          "iso2": "US",
          "iso3": "USA",
          "admin_name": "New York",
          "capital": "",
          "population": 18713220,
          "id": 1840034016
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [88.3639, 22.5727]
        },
        "properties": {
          "city": "Kolkāta",
          "city_ascii": "Kolkata",
          "country": "India",
          "iso2": "IN",
          "iso3": "IND",
          "admin_name": "West Bengal",
          "capital": "admin",
          "population": 18698000,
          "id": 1356060520
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [37.6178, 55.7558]
        },
        "properties": {
          "city": "Moscow",
          "city_ascii": "Moscow",
          "country": "Russia",
          "iso2": "RU",
          "iso3": "RUS",
          "admin_name": "Moskva",
          "capital": "primary",
          "population": 17693000,
          "id": 1643318494
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [100.5167, 13.7500]
        },
        "properties": {
          "city": "Bangkok",
          "city_ascii": "Bangkok",
          "country": "Thailand",
          "iso2": "TH",
          "iso3": "THA",
          "admin_name": "Krung Thep Maha Nakhon",
          "capital": "primary",
          "population": 17573000,
          "id": 1764068610
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [90.3944, 23.7289]
        },
        "properties": {
          "city": "Dhaka",
          "city_ascii": "Dhaka",
          "country": "Bangladesh",
          "iso2": "BD",
          "iso3": "BGD",
          "admin_name": "Dhaka",
          "capital": "primary",
          "population": 16839000,
          "id": 1050529279
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [-58.3819, -34.5997]
        },
        "properties": {
          "city": "Buenos Aires",
          "city_ascii": "Buenos Aires",
          "country": "Argentina",
          "iso2": "AR",
          "iso3": "ARG",
          "admin_name": "Buenos Aires, Ciudad Autónoma de",
          "capital": "primary",
          "population": 16216000,
          "id": 1032717330
        }
      }
    ]
  }

  // console.log(geoJSON.features[Math.floor(Math.random() * geoJSON.features.length)].geometry.coordinates) // take features array in geoJSON obj and return 

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

      // ADD LATER ON BUTTON TOGGLE: TERRAIN 
      // map.current.addSource('mapbox-dem', {
      //   'type': 'raster-dem',
      //   'url': 'mapbox://mapbox.terrain-rgb'
      // });

      // map.current.setTerrain({
      //   'source': 'mapbox-dem',
      //   'exaggeration': 1.5
      // });

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

  // function getPOI(longitude, latitude) {
  //   fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?routing=true&access_token=${mapboxgl.accessToken}`)
  //     .then(response => response.json())
  //     .then(data => console.log(data))
  // }

  // function getPOI(longitude, latitude) {
  //   fetch(`https://api.bigdatacloud.net/data/reverse-geocode?latitude=${latitude}&longitude=${longitude}&localityLanguage=en&key=bdc_e3a41bcc2937431191cc18382f3d5492`)
  //     .then(response => response.json())
  //     .then(data => console.log(data))
  // }


  const revolutionSpeed = 0.5;
  let spinEnabled = false;

  function spinGlobe() {
    const center = map.current.getCenter();

    if (spinEnabled) {
      let distancePerSecond = 360 / revolutionSpeed;
      center.lng += distancePerSecond
      center.lat = Math.floor(Math.random() * (90 - (-90))) + (-90);
    }
    map.current.easeTo({ center, duration: 3000, easing: (n) => n });
  }

  const randomPOI = geoJSON.features[Math.floor(Math.random() * geoJSON.features.length)]

  function flyToCity() {
    const center = map.current.getCenter();
    //get random city object from geoJSON file

    console.log(randomPOI.properties, randomPOI.geometry.coordinates)
    center.lng = randomPOI.geometry.coordinates[0]
    center.lat = randomPOI.geometry.coordinates[1]

    map.current.flyTo({
      center,
      zoom: 9,
      speed: 0.3,
      duration: 9000,
      curve: 1.5,
      essential: true,
      easing(t) {
        return t;
      }
    });


  }


  //? testing bigdatacloud wikidataID



  //* get random city from static JSON -> 
  //* get wikiDataID from bigDataCloud API -> 
  //!bigclouddata get request example - ask gaby for the one that returns wikidata IDs
  // function getPOI(longitude, latitude) {

  async function pleaseRun() {
    const firstAPI = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode?latitude=${randomPOI.geometry.coordinates[1]}&longitude=${randomPOI.geometry.coordinates[0]}&localityLanguage=en&key=bdc_3310b69981ed4fba900d25cc711e6f87`)
      .then(response => response.json())
      .then(data => data)
      
    const cityObj = firstAPI.localityInfo.administrative.find((poiObj => poiObj.name === firstAPI.city))
    const id = cityObj.wikidataId

    const secondAPI = await fetch(`http://www.wikidata.org/w/api.php?action=wbgetentities&origin=*&ids=${id}&sitefilter=enwiki&format=json`)
      .then(response => response.json())
      .then(data => data)

    const wikiTitle = secondAPI.entities[id].sitelinks.enwiki.title

    const thirdAPI = await fetch(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${wikiTitle}&origin=*`)
      .then(response => response.json())
      .then(data => data)

    const keys = Object.keys(thirdAPI.query.pages)[0]
    console.log(thirdAPI.query.pages[keys].pageID)

    console.log(thirdAPI.query.pages[keys].extract)

    // const thirdAPI = await fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${wikiTitle}&format=json&origin=*`).then(response => response.json()).then(data => data)

    
    
  }

  pleaseRun()


  // }
  // fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=United States&format=json&origin=*`).then(response => response.json()).then(json => {
  //   console.log(json);
  // })



  // //! use wikiDataID to GET json with wikimedia pageID
  // fetch(`http://www.wikidata.org/w/api.php?action=wbgetentities&origin=*&ids=Q30&sitefilter=enwiki&format=json`).then(response => response.json()).then(json => {
  //   console.log(json);
  // })

  // //! -> use page ID to get extracted intro... via (https://stackoverflow.com/questions/8555320/is-there-a-wikipedia-api-just-for-retrieve-the-content-summary)?
  // //*url to get extract with wiki pageID: https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&pageids=49728&origin=*

  // //https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&pageids=21721040
  // fetch(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&pageids=3434750&origin=*`).then(response => response.json()).then(json => {
  //   console.log(json);
  // })
  // fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=United States&format=json&origin=*`).then(response => response.json()).then(json => {
  //   console.log(json);
  // })



  const handleBtn = () => {
    setButtonDisabled(true)
    if (!spinEnabled) {
      spinEnabled = !spinEnabled

      //! globe stays zoomed in after the first spin
      spinGlobe()

      //! interrtupting the spin won't stop flyToCity from running
      setTimeout(() => {
        flyToCity()
        setButtonDisabled(false)
      }, 3000)

      button.current.innerHTML = 'Searching..';
    }
    spinEnabled = !spinEnabled

  };

  return (
    <>
      <div className="wrapper">
        <button id="btn-spin" ref={button} disabled={buttonDisabled} onClick={() => handleBtn()}>Start rotation</button>
        <div className="logoInfo">
          <div className="logoContainer">
            <h1>globe.trotter</h1>
          </div>
          <div className="infoContainer">
            <ul className="mapProperties">
              <li>Longitude: {lng}</li>
              <li>Latitude: {lat}</li>
              <li>Zoom Level: {zoom}</li>
            </ul>

          </div>
        </div>
        <div ref={mapContainer} className="map-container" />
      </div>
    </>
  );

}