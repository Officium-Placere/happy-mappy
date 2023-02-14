import React, { useState, useEffect } from 'react';

export default function GetCityData({ map, trigger }) {

    const [showInfo, setShowInfo] = useState(false);

    const [wikiBlurb, setWikiBlurb] = useState()
    const [wikiPic, setWikiPic] = useState()
    const [tpBlurb, setTpBlurb] = useState()
    const [tpMetrics, setTpMetrics] = useState()
    const [tpPic, setTpPic] = useState()
    const [cityName, setCityName] = useState()

    
    
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
                const firstAPI = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode?latitude=${center.lat}&longitude=${center.lng}&localityLanguage=en&key=bdc_e3a41bcc2937431191cc18382f3d5492`)
                    .then(response => response.json())
                    .then(data => data)

                const cityObj = firstAPI.localityInfo.administrative.find((poiObj => poiObj.name === firstAPI.city))

                // ID returned for coordinates is Sao Paulo state, so change id to Q174 for Sao Paulo city
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

                // fetch main image from wiki article
                const fourthAPI = await fetch(`https://en.wikipedia.org/w/api.php?action=query&origin=%2A&pithumbsize=800&prop=pageimages&titles=${wikiTitle}&format=json`)
                    .then(response => response.json())
                    .then(data => data)

                // get wikiID out of fourthAPI
                const imageKey = Object.keys(fourthAPI.query.pages)[0]
                const imageLink = (fourthAPI.query.pages[imageKey].thumbnail.source)

                // FIND CITY VIA COORDS TO GET CORRECT CITY NAME IN TELEPORT, AND THEN FIND IMAGE AFTER
                const teleportCity = await fetch(`https://api.teleport.org/api/locations/${center.lat},${center.lng}/`)
                    .then(response => response.json())
                    .then(data => data);

                const nearestCity = Object.entries(teleportCity._embedded)
                const nearestCityName = nearestCity[0];
                const cName = Object.entries(nearestCityName[1][0]._links)
                const tpCity = cName[0][1].name

                // remove 'city' from the name, when it's not Mexico City, ie for New York City as API lists NYC as New York
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

                const teleportImg = await fetch(`https://api.teleport.org/api/urban_areas/slug:${cityASCII}/images/`)
                    .then(response => response.json())
                    .then(data => data);
                const tpPhoto = teleportImg.photos[0].image.mobile

                const teleportBlurb = await fetch(`https://api.teleport.org/api/urban_areas/slug:${cityASCII}/scores/`)
                    .then(response => response.json())
                    .then(data => data);

                const citySummary = teleportBlurb.summary;
                // NOTE: for Moscow- there's a byline in <i> tags above the blurb, we might want to cut it out..?

                const cityRanking = teleportBlurb.categories
                const cityRank = cityRanking.map((category) => {
                    return `${category.name}: ${category.score_out_of_10.toFixed(2)} / 10`
                })

                const regex = /(<([^>]+)>)/ig;
                const tpSummary = citySummary.replace(regex, '');
                setTpBlurb(tpSummary)
                setWikiBlurb(blurb);
                setWikiPic(imageLink)
                setTpMetrics(cityRank)
                setTpPic(tpPhoto)
                setCityName(wikiTitle)

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
            <button
                onClick={() => setShowInfo(!showInfo)}>{showInfo ? 'Hide city info' : 'Show city info'}
            </button>

            <div style={{ display: showInfo ? 'block' : 'none' }}>
                <p>{wikiBlurb}.. <a target="_blank" rel="noopener noreferrer" href={`https://en.wikipedia.org/wiki/${cityName}`}>see more</a>
                </p>

                <p>{tpMetrics}</p>
                <p>{tpBlurb}</p>

                <div>
                    <img src={tpPic} alt={`${cityName}`} />
                </div>
                <div>
                    <img src={wikiPic} alt={`${cityName}`} />
                </div>

            </div>
        </>
    )
}