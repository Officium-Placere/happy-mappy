import React, { useState, useEffect, useRef } from 'react';
import Graph from './Graph';
import teleportCities from '../teleportCities.json'

export default function GetCityData({ map, trigger, showCityData }) {

    const cityInfoContainer = useRef(null);
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
                label: 'City Data',
                data: [5],
                backgroundColor: [
                    'white'
                ],
                borderWidth: 1,
            }
        ]
    });

    useEffect(() => {

        function easeToCity() {
            const center = map.current.getCenter();
            const cityNum = teleportCities.features[Math.floor(Math.random() * teleportCities.features.length)]
            center.lng = cityNum.geometry.coordinates[0]
            center.lat = cityNum.geometry.coordinates[1]

            map.current.flyTo({
                center,
                zoom: 9,
                speed: 0.4,
                duration: 10000,
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

                    const cityObj = []
                firstAPI.localityInfo.administrative.forEach(poiObj => {
                    if (poiObj.name === firstAPI.city) {
                        cityObj.push(poiObj)
                    }
                })
                // if city isn't in administrative property, check informative property, do same loop:
                if (cityObj.length === 0) {
                    firstAPI.localityInfo.informative.forEach(poiObj => {
                        if (poiObj.name === firstAPI.city) {
                            cityObj.push(poiObj)
                        }
                    })
                }

                let city
                let id = ''
                cityObj.forEach(obj => {
                    if (obj.description) { // some of the cityObj objects do not have description properties, so only if they all do, then go through this:
                        if (obj.description.includes('city')) {
                            city = obj
                        } else if (obj.description.includes('capital')) {
                            city = obj
                        } else if (obj.description.includes('municipality')) {
                            city = obj
                        } else if (obj.description.includes('metropolis')) {
                            city = obj
                        }
                        else city = false
                    }
                    else city = false
                })

                if (city === false) {
                    city = cityObj[0]
                }

                id = city.wikidataId;
                const secondAPI = await fetch(`https://www.wikidata.org/w/api.php?action=wbgetentities&origin=*&ids=${id}&sitefilter=enwiki&format=json`)
                    .then(response => response.json())
                    .then(data => data)

                    const wikiTitle = secondAPI.entities[id].sitelinks.enwiki.title

                    setCityName(wikiTitle) //SET STATE 

                const thirdAPI = await fetch(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${wikiTitle}&origin=*`)
                    .then(response => response.json())
                    .then(data => data)

                const keys = Object.keys(thirdAPI.query.pages)[0]
                const wkExtract = (thirdAPI.query.pages[keys].extract)
                // save first 3 sentences and remove '(listen)' link from the wiki extract
                const listenRegex = (/\(listen\)/g);
                const wkBlurb = wkExtract.match(/[^.]*.[^.]*.[^.]*./)[0].replace(listenRegex, '');

                setWikiBlurb(wkBlurb) //SET STATE 

                // fetch image from wiki article
                const fourthAPI = await fetch(`https://en.wikipedia.org/w/api.php?action=query&origin=%2A&pithumbsize=800&prop=pageimages&titles=${wikiTitle}&format=json`)
                    .then(response => response.json())
                    .then(data => data)

                const wkImageKey = Object.keys(fourthAPI.query.pages)[0]
                const wkImage = (fourthAPI.query.pages[wkImageKey].thumbnail.source)

                setWikiPic(wkImage) //SET STATE 

                let cityASCII = cityNum.properties['city-ascii'].toLowerCase().split(' ').join('-')

                const teleportImg = await fetch(`https://api.teleport.org/api/urban_areas/slug:${cityASCII}/images/`)
                    .then(response => response.json())
                    .then(data => data);
                const tpImage = teleportImg.photos[0].image.mobile

                setTpPic(tpImage) //SET STATE 

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
                const titleRegex = /^.*?(?=:)/gm;
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
                            label: 'Score',
                            data: graphData.map((data) => data.metric),
                            backgroundColor: '#2f4d6b',
                            borderColor: "white",
                            borderWidth: 0.1,
                            borderRadius: 25
                        }
                    ]
                });

                // removes anything in between <i> tags (author byline for tpSummary):
                const bylineRegex = /<i>(.*?)<\/i>/gs;
                // removes html tags from teleport summary:
                const htmlRegex = /(<([^>]+)>)/ig;
                const tpSummary = citySummary.replace(bylineRegex, '').replace(htmlRegex, '');

                setTpBlurb(tpSummary) //SET STATE 
            }

            getApiData()


            // try {
            // } catch (error) {
            //     alert(`Looks like there's an issue on our end! Try again later!`)
            // }
        }

        // don't run on the initial render
        if (trigger !== 0) {
            easeToCity();
        }
    }, [trigger, map]);

    return (
        <>
            {
                showCityData
                    ?
                    <div>
                        <button
                            className='show-city-button sheen'
                            onClick={() => setShowInfo(!showInfo)}>{showInfo ? 'Hide city info' : `Show city info`}
                        </button>

                        {showInfo ? <div className="cityOverlay"></div> : null}

                        <div
                            ref={cityInfoContainer}
                            className={showInfo ? 'city-info-container slideout-active' : 'city-info-container'}>
                            <div className="wrapper">
                                <div className='city-info'>
                                <button className='close-city-info-button' onClick={() => setShowInfo(false)}>x</button>

                                    <h2>{cityName}</h2>
                                    <p>{wikiBlurb}.. <a target="_blank" rel="noopener noreferrer" href={`https://en.wikipedia.org/wiki/${cityName}`}>see more</a></p >
                                    <div className='image-container'>
                                        <div className="photo">
                                            <img src={tpPic} alt={`${cityName}`} />
                                        </div>
                                        <div className="photo">
                                            <img src={wikiPic} alt={`${cityName}`} />
                                        </div>
                                    </div>
                                    {/* <h3>Teleport City Ranking</h3> */}
                                    <p>{tpBlurb}</p>
                                    <Graph chartData={chartData}/>
                                    <p className='visually-hidden'>City Ranking per Category: Score out of 10: {tpMetrics}</p>
                                </div >
                            </div >
                        </div>
                    </div>

                    :
                    null
            }
        </>
    )
}