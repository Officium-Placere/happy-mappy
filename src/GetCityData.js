import React, { useState, useEffect } from 'react';
import Graph from './Graph';

export default function GetCityData({ map, trigger, showCityData }) {

    const [showInfo, setShowInfo] = useState(false);
    const [wikiBlurb, setWikiBlurb] = useState()
    const [wikiPic, setWikiPic] = useState()
    const [tpBlurb, setTpBlurb] = useState()
    const [tpMetrics, setTpMetrics] = useState()
    const [tpPic, setTpPic] = useState()
    const [cityName, setCityName] = useState()

    // currently chartData state has to have data in it on page load otherwise there's an error and the page goes blank, as state is undefined on first click of the button. 
    const [chartData, setChartData] = useState({
        labels: ['Red'],
        datasets: [
            {
                label: 'Starting Test Data',
                data: [5],
                backgroundColor: [
                    'white'
                ],
                borderWidth: 1,
            }
        ]
    });

    useEffect(() => {

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

        function easeToCity() {
            const center = map.current.getCenter();
            const cityNum = testJson.features[Math.floor(Math.random() * testJson.features.length)]
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

            async function getApiData() {
                let id
                let wikiTitle
                let cityASCII

                try {

                    const firstAPI = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode?latitude=${center.lat}&longitude=${center.lng}&localityLanguage=en&key=bdc_e3a41bcc2937431191cc18382f3d5492`)
                        .then(response => response.json())
                        .then(data => data)

                    const cityObj = firstAPI.localityInfo.administrative.find((poiObj => poiObj.name === firstAPI.city))

                    // ID returned for coordinates is Sao Paulo state, so change id to Q174 for Sao Paulo city
                    cityObj.wikidataId === 'Q175' ? id = 'Q174' : id = cityObj.wikidataId;

                } catch (error) {
                    alert(`big data cloud api not working`)
                }

                try {
                    const secondAPI = await fetch(`http://www.wikidata.org/w/api.php?action=wbgetentities&origin=*&ids=${id}&sitefilter=enwiki&format=json`)
                        .then(response => response.json())
                        .then(data => data)

                    let wikiTitle = secondAPI.entities[id].sitelinks.enwiki.title

                    setCityName(wikiTitle) //SET STATE 

                } catch (error) {
                    alert(`wiki api not working`)
                }

                try {

                    const thirdAPI = await fetch(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${wikiTitle}&origin=*`)
                        .then(response => response.json())
                        .then(data => data)

                    const keys = Object.keys(thirdAPI.query.pages)[0]
                    const wkExtract = (thirdAPI.query.pages[keys].extract)
                    // save first 3 sentences and remove '(listen)' link from the wiki extract
                    // NOTE: MAYBE CUT FIRST PARENTHESIS OUT ENTIRELY???
                    const listenRegex = (/\(listen\)/g);
                    const wkBlurb = wkExtract.match(/[^.]*.[^.]*.[^.]*./)[0].replace(listenRegex, '');

                    setWikiBlurb(wkBlurb) //SET STATE 

                } catch (error) {
                    alert(`wiki api call #2 not working`)
                }

                try {
                    // fetch main image from wiki article
                    const fourthAPI = await fetch(`https://en.wikipedia.org/w/api.php?action=query&origin=%2A&pithumbsize=800&prop=pageimages&titles=${wikiTitle}&format=json`)
                        .then(response => response.json())
                        .then(data => console.log(data))
                    

                    const wkImageKey = Object.keys(fourthAPI.query.pages)[0]
                    const wkImage = (fourthAPI.query.pages[wkImageKey].thumbnail.source)

                    setWikiPic(wkImage) //SET STATE 

                } catch (error) {
                    alert(`wiki api call #3 not working`)
                }
                try {
                    // FIND CITY VIA COORDS TO GET CORRECT CITY NAME IN TELEPORT, AND THEN FIND IMAGE AFTER
                    const teleportCity = await fetch(`https://api.teleport.org/api/locations/${center.lat},${center.lng}/`)
                        .then(response => response.json())
                        .then(data => data);

                    const nearestCity = Object.entries(teleportCity._embedded)
                    const nearestCityName = nearestCity[0];
                    const cName = Object.entries(nearestCityName[1][0]._links)
                    const tpCity = cName[0][1].name

                    // remove 'city' from the name when it's not Mexico City, ie for New York City as API lists NYC as New York
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

                    // remove accents from the city name
                    function removeAccents(str) {
                        cityASCII = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                        return cityASCII
                    }
                    removeAccents(cityLowerCase)

                } catch (error) {
                    alert(`Teleport api call #1 not working`)
                }

                try {
                    const teleportImg = await fetch(`https://api.teleport.org/api/urban_areas/slug:${cityASCII}/images/`)
                        .then(response => response.json())
                        .then(data => data);
                    const tpImage = teleportImg.photos[0].image.mobile

                    setTpPic(tpImage) //SET STATE 

                } catch (error) {
                    alert(`Teleport api call #2 not working`)
                }

                try {
                    const teleportBlurb = await fetch(`https://api.teleport.org/api/urban_areas/slug:${cityASCII}/scores/`)
                        .then(response => response.json())
                        .then(data => data);

                    const citySummary = teleportBlurb.summary;
                    const cityRanking = teleportBlurb.categories
                    const cityRank = cityRanking.map((category) => {
                        return `${category.name}: ${category.score_out_of_10.toFixed(2)} `
                    })

                    setTpMetrics(cityRank) //SET STATE 

                    // regex to select category title and metric out of string and push them into a data object
                    const titleRegex = /^.*?(?=:)/gm; //  /^.*?(?=\:)/gm; - was this!!!
                    const metricRegex = /(?<=: ).*/gm;
                    const graphData = [];

                    cityRank.forEach((metric) => {
                        graphData.push({ title: metric.match(titleRegex), metric: parseFloat(metric.match(metricRegex)) })
                    })

                    // SET STATE FOR CHART JS GRAPH
                    setChartData({
                        labels: graphData.map((data) => data.title[0]),
                        datasets: [
                            {
                                label: "Score out of 10 ",
                                data: graphData.map((data) => data.metric),
                                backgroundColor: [
                                    '#F0F8F9',
                                    '#E2F1F3',
                                    '#D4EAED',
                                    '#C5E3E7',
                                    '#B7DCE1',
                                    '#A9D5DB',
                                    '#9ACED5',
                                    '#8CC7CF',
                                    '#7EC0C9',
                                    '#6FB9C3',
                                    '#61B2BD',
                                    '#52ABB7',
                                    '#48A1AD',
                                    '#42939E',
                                    '#3C8690',
                                    '#367981',
                                    '#306C73'
                                ],
                                borderColor: "black",
                                borderWidth: 1
                            }
                        ]
                    });

                    // removes anything in between <i> tags (author byline for tpSummary):
                    const bylineRegex = /<i>(.*?)<\/i>/gs;
                    // removes html tags from teleport summary:
                    const htmlRegex = /(<([^>]+)>)/ig;
                    const tpSummary = citySummary.replace(bylineRegex, '').replace(htmlRegex, '');

                    setTpBlurb(tpSummary) //SET STATE 
                } catch (error) {
                    alert(`Teleport api call #3 not working`)
                }
            }

            getApiData()

        }

        // don't run on the initial render
        if (trigger !== 0) {
            easeToCity();
        }
    }, [trigger, map]);


    return (
        <>
            {showCityData ?
                <div>
                    <button
                        onClick={() => setShowInfo(!showInfo)}>{showInfo ? 'Hide city info' : 'Show city info'}
                    </button>

                    <div style={{ display: showInfo ? 'block' : 'none' }}>
                        <p>{wikiBlurb}.. <a target="_blank" rel="noopener noreferrer" href={`https://en.wikipedia.org/wiki/${cityName}`}>see more</a>
                        </p>

                        <Graph chartData={chartData} />

                        <p className='visually-hidden'>City Rankings per Category: Score out of 10: {tpMetrics} / 10</p>
                        <p>{tpBlurb}</p>

                        <div>
                            <img src={tpPic} alt={`${cityName}`} />
                        </div>
                        <div>
                            <img src={wikiPic} alt={`${cityName}`} />
                        </div>

                    </div>
                </div>
                : null}
        </>
    )
}