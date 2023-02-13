import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import "./styles/styles.scss";
// import DisplayCityPhotos from './DisplayCityPhotos';


//* to add: geocoding + markers (https://docs.mapbox.com/mapbox-gl-js/example/marker-from-geocode/)
//* permanence? logins?
//* cool isotope grid?

mapboxgl.accessToken = 'pk.eyJ1IjoiYXBwbGVtdWZmaW4iLCJhIjoiY2xjdmFzZmppMDYwMTNxbW92dTBhYTZrdSJ9.NMqeTpj0UTSYGlOzAsBAAw';

export default function App() {

  const map = useRef(null);
  const mapContainer = useRef(null);
  const button = useRef(null);
  const blurbContainer = useRef(null);
  const imageContainer = useRef(null);
  const teleportImageContainer = useRef(null);
  const teleportSummary = useRef(null);
  const teleportRanking = useRef(null);
  const spinButton = useRef(null);
  
  const [lng, setLng] = useState(Math.floor(Math.random() * (90 - (-90))) + (-90));
  const [lat, setLat] = useState(Math.floor(Math.random() * (45 - (-45))) + (-45));
  const [zoom, setZoom] = useState(2);
  const [showInfo, setShowInfo] = useState(false);
  // const [showInfoBtn, setShowInfoBtn] = useState(false);
  // const [cityPhotos, setCityPhotos] = useState([]);

  const testJson = {
    "type": "FeatureCollection",
    "features": [
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
      if (map.current.getZoom() === 9) {
        button.current.innerHTML = 'Try again!';
      }
      
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

  const revolutionSpeed = 0.5;
  let spinEnabled = false;

  function spinGlobe() {

    const center = map.current.getCenter();
    // const time = Math.floor(Math.random() * (5000 - 2000)) + 2000
    if (spinEnabled) {
      let distancePerSecond = 360 / revolutionSpeed;
      center.lng += distancePerSecond
      center.lat = Math.floor(Math.random() * (90 - (-90))) + (-90);
    }
    map.current.zoomTo(2, { easing: (n) => n, duration: 1000 })
      
    setTimeout(() => {
      map.current.easeTo({ center, duration: 3000, easing: (n) => n });
    }, 1000)
    
  }

  // const randomPOI = testJson.features[Math.floor(Math.random() * testJson.features.length)]

  const randomPOI = testJson.features[Math.floor(Math.random() * testJson.features.length)]

  // const randomPOI = geoJSON.features[Math.floor(Math.random() * geoJSON.features.length)]

  function easeToCity() {
    const center = map.current.getCenter();
    const cityNum = testJson.features[Math.floor(Math.random() * testJson.features.length)]
    console.log(cityNum.properties, cityNum.geometry.coordinates)
    center.lng = cityNum.geometry.coordinates[0]
    center.lat = cityNum.geometry.coordinates[1]

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
    

    //* get random city from static JSON -> 
    //* get wikiDataID from bigDataCloud API -> 
    //!bigclouddata get request example - ask gaby for the one that returns wikidata IDs
    // function getPOI(longitude, latitude) {

    async function getApiData() {
      const firstAPI = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode?latitude=${randomPOI.geometry.coordinates[1]}&longitude=${randomPOI.geometry.coordinates[0]}&localityLanguage=en&key=bdc_e3a41bcc2937431191cc18382f3d5492`)
        .then(response => response.json())
        .then(data => data)

      const cityObj = firstAPI.localityInfo.administrative.find((poiObj => poiObj.name === firstAPI.city))

      // ID returned for coordinates is Sao Paulo state, so in this case, change id to Q174 for Sao Paulo city
      let id = ''
      cityObj.wikidataId === 'Q175' ? id = 'Q174' : id = cityObj.wikidataId;

      const secondAPI = await fetch(`http://www.wikidata.org/w/api.php?action=wbgetentities&origin=*&ids=${id}&sitefilter=enwiki&format=json`)
        .then(response => response.json())
        .then(data => data)

      const wikiTitle = secondAPI.entities[id].sitelinks.enwiki.title

      const thirdAPI = await fetch(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${wikiTitle}&origin=*`)
        .then(response => response.json())
        .then(data => data)

      // get wikiID out of the thirdAPI result so it's consistent on every call
      const keys = Object.keys(thirdAPI.query.pages)[0]

      const extract = (thirdAPI.query.pages[keys].extract)
      // save first 3 sentences of extract into blurb
      const blurb = extract.match(/[^.]*.[^.]*.[^.]*./)[0]
      // add blurb to page and link to rest of article
      blurbContainer.current.innerHTML = `<p>${blurb}.. <a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/${wikiTitle}">see more</a></p>`

      // fetch main image from wiki article
      const fourthAPI = await fetch(`https://en.wikipedia.org/w/api.php?action=query&origin=%2A&pithumbsize=800&prop=pageimages&titles=${wikiTitle}&format=json`)
        .then(response => response.json())
        .then(data => data)

      // get wikiID out of fourthAPI
      const imageKey = Object.keys(fourthAPI.query.pages)[0]
      const imageLink = (fourthAPI.query.pages[imageKey].thumbnail.source)
      imageContainer.current.innerHTML = `<img src=${imageLink} alt="Image of ${wikiTitle} city" />`


      // FIND CITY VIA COORDS TO GET CORRECT CITY NAME IN TELEPORT, AND THEN FIND IMAGE AFTER
      const teleportCity = await fetch(`https://api.teleport.org/api/locations/${randomPOI.geometry.coordinates[1]},${randomPOI.geometry.coordinates[0]}/`)
        .then(response => response.json())
        .then(data => data);
      // console.log(teleportCity._embedded)
      const nearestCity = Object.entries(teleportCity._embedded)
      // console.log(nearestCity[0]) - targetting into the object to get the city name
      const nearestCityName = nearestCity[0];
      // more targetting into the object to get the city name
      const cName = Object.entries(nearestCityName[1][0]._links)
      const tpCity = cName[0][1].name

      // remove 'city' from the name, when it's not Mexico City, ie for New York City as API lists NYC as New York.. UGHHHHH
      const editedCityName = [];
      let cityLowerCase = '';
      tpCity === 'Mexico City'
        ?
        cityLowerCase = tpCity.toLowerCase().split(' ').join('-')
        :
        tpCity.toLowerCase().split(' ').map((word) => {
          if (word !== 'city') {
            editedCityName.push(word)
          }
          cityLowerCase = editedCityName.join('-');
          return cityLowerCase;
        })

      // remove accents from the city name (ie Sao Paulo)
      let cityASCII = ''
      function removeAccents(str) {
        cityASCII = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        return cityASCII
      }
      removeAccents(cityLowerCase)
      // console.log(cityASCII)

      // clear out teleport refs if the city isn't found in teleport api:
      teleportRanking.current.innerHTML = '';
      teleportSummary.current.innerHTML = '';
      teleportImageContainer.current.innerHTML = '';

      // IMAGE FROM TELEPORT API
      const teleportImg = await fetch(`https://api.teleport.org/api/urban_areas/slug:${cityASCII}/images/`)
        .then(response => response.json())
        .then(data => data);
      const tpPhoto = teleportImg.photos[0].image.mobile
      // console.log(tpPhoto)
      teleportImageContainer.current.innerHTML = `<img src=${tpPhoto} alt="Image of ${wikiTitle} city" />`


      // IMAGE FROM TELEPORT API
      const teleportBlurb = await fetch(`https://api.teleport.org/api/urban_areas/slug:${cityASCII}/scores/`)
        .then(response => response.json())
        .then(data => data);

      // get the city summary blurb
      const citySummary = teleportBlurb.summary;
      // NOTE: for Moscow- there's a byline in <i> tags above the blurb, we might want to cut it out..?
      teleportSummary.current.innerHTML = `${citySummary}`

      // get the ranking for city
      const cityRanking = teleportBlurb.categories

      const cityRank = cityRanking.map((category) => {
        return `${category.name}: ${category.score_out_of_10.toFixed(2)}/10`
      })
      teleportRanking.current.innerHTML = cityRank
    }
    getApiData()
  }


  //? testing bigdatacloud wikidataID



  //* get random city from static JSON -> 
  //* get wikiDataID from bigDataCloud API -> 
  //!bigclouddata get request example - ask gaby for the one that returns wikidata IDs
  // function getPOI(longitude, latitude) {

  // fetch(`https://api.bigdatacloud.net/data/reverse-geocode?latitude=${randomPOI.geometry.coordinates[1]}&longitude=${randomPOI.geometry.coordinates[0]}&localityLanguage=en&key=bdc_3310b69981ed4fba900d25cc711e6f87`)
  //   .then(response => response.json())
  //   .then(data => {
  //     // console.log(data)
  //     const cityObj = data.localityInfo.administrative.find((poiObj => poiObj.name === data.city))
  //     // console.log(cityObj)//

  //     return fetch(`http://www.wikidata.org/w/api.php?action=wbgetentities&origin=*&ids=${cityObj.wikidataId}&sitefilter=enwiki&format=json`)

  //   })
  //   .then(response => response.json())
  //   .then(data => console.log(data)) //should return wikiData on the city
  //   .catch(error => console.log(error))



  // }




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
    // TO ADD: IF zoom is 9, ie we're zoomed into a city, THEN zoom out to 2 first before starting spinGlobe() so we don't get a blur of white for a few seconds as if we spin zoomed at 9 we won't see any map details, we have to be zoomed out to see globe spinning. 
    spinEnabled = !spinEnabled;
    if (spinEnabled) {
      spinGlobe()
      setTimeout(() => {
        easeToCity()
        // setButtonDisabled(false)
      }, 3000)
      button.current.innerHTML = 'Finding...';
    }
    spinEnabled = !spinEnabled

  };


  return (
    <>
      <div className="wrapper">
        <button id="btn-spin" ref={button} 
        // smart disabled={buttonDisabled} 
        onClick={() => handleBtn()}>Start rotation</button>
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

        {/* <DisplayCityPhotos photos={cityPhotos} /> */}

        {/* <div style={{ display: showInfoBtn ? 'block' : 'none'}}> */}
          <button ref={spinButton} onClick={() => setShowInfo(!showInfo)}>{showInfo ? 'Hide city info' : 'Show city info'}</button>
        {/* </div> */}


        <div style={{ display: showInfo ? 'block' : 'none' }}>
          <div ref={blurbContainer} />
          <div ref={imageContainer} />
          <div ref={teleportImageContainer} />
          <div ref={teleportRanking} />
          <div ref={teleportSummary} />
        </div>

      </div>
    </>
  );

}