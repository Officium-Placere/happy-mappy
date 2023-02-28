import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import "./styles/styles.scss";
import GetCityData from './GetCityData';

mapboxgl.accessToken = 'pk.eyJ1IjoiYXBwbGVtdWZmaW4iLCJhIjoiY2xjdmFzZmppMDYwMTNxbW92dTBhYTZrdSJ9.NMqeTpj0UTSYGlOzAsBAAw';

export default function DisplayMap() {

    const map = useRef(null);
    const mapContainer = useRef(null);
    const spinButton = useRef(null);

    const [trigger, setTrigger] = useState(0);
    const [lng, setLng] = useState(Math.floor(Math.random() * (90 - (-90))) + (-90));
    const [lat, setLat] = useState(Math.floor(Math.random() * (45 - (-45))) + (-45));
    const [zoom, setZoom] = useState(2);
    const [showCityData, setShowCityData] = useState(false);
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
                spinButton.current.innerHTML = 'Try again!';
                if (
                    spinButton.current.innerHTML === 'Try again!'
                ) {
                    map.current.dragPan.enable()
                    map.current.dragRotate.enable()
                    map.current.scrollZoom.enable();
                    map.current.boxZoom.enable();
                    map.current.keyboard.enable();
                    map.current.touchZoomRotate.enable();
                    map.current.doubleClickZoom.enable();

                    setShowCityData(true);
                }
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
        if (spinEnabled) {
            let distancePerSecond = 360 / revolutionSpeed;
            center.lng += distancePerSecond
            center.lat = Math.floor(Math.random() * (90 - (-90))) + (-90);
            // map.current.scrollZoom.disable();
        }

        if (map.current.getZoom() <= 2) { // if map is zoomed out to 2 or less, spin randomly 
            map.current.easeTo({ center, duration: 3000, easing: (n) => n });
        } else { // else zoom out to 2 first, and then spin randomly
            map.current.zoomTo(2, { easing: (n) => n, duration: 1000 })
            setTimeout(() => {
                map.current.easeTo({ center, duration: 3000, easing: (n) => n });
            }, 1000)
        }
    };



    const handleBtn = () => {
        spinEnabled = !spinEnabled;
        if (spinEnabled) {
            // map.current.scrollZoom.disable();
            spinGlobe()
            setTimeout(() => {
                setTrigger((trigger) => trigger + 1);
            }, 3000)
            spinButton.current.innerHTML = 'Finding...';

            if (
                spinButton.current.innerHTML === 'Finding...'
            ) {
                map.current.dragPan.disable()
                map.current.dragRotate.disable()
                map.current.scrollZoom.disable();
                map.current.boxZoom.disable();
                map.current.keyboard.disable();
                map.current.touchZoomRotate.disable();
                map.current.doubleClickZoom.disable();

                setShowCityData(false);
            }
        }
        spinEnabled = !spinEnabled
    };

    return (
        <div 
        className='display-map'
        >
            <button
                className='spin-button'
                disabled={spinEnabled}
                id="btn-spin"
                ref={spinButton}
                onClick={() => handleBtn()}>Start rotation
            </button>
            <div ref={mapContainer} className="map-container" />

            <GetCityData
                map={map}
                trigger={trigger}
                showCityData={showCityData}
            />

        </div>
    )
}