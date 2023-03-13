import React, { useState, useEffect, useRef } from 'react';
import Graph from './Graph';
import teleportCities from './teleportCities.json'

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

        function easeToCity() {
            const center = map.current.getCenter();
            const cityNum = teleportCities.features[Math.floor(Math.random() * teleportCities.features.length)]
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
                // console.log(firstAPI)
                const cityObj = []
                firstAPI.localityInfo.administrative.forEach(poiObj => {
                    if (poiObj.name === firstAPI.city) {
                        cityObj.push(poiObj)
                        // console.log(poiObj)
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
                // console.log(cityObj)
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
                // console.log(city)
                if (city === false) {
                    city = cityObj[0]
                }
                // console.log(cityObj[0].wikidataId)
                id = city.wikidataId;
                const secondAPI = await fetch(`http://www.wikidata.org/w/api.php?action=wbgetentities&origin=*&ids=${id}&sitefilter=enwiki&format=json`)
                    .then(response => response.json())
                    .then(data => data)
                // console.log(secondAPI)
                const wikiTitle = secondAPI.entities[id].sitelinks.enwiki.title
                // console.log(wikiTitle)
                setCityName(wikiTitle) //SET STATE 

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

                // fetch main image from wiki article
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

                // console.log(wikiTitle)
                // console.log(wkBlurb)
                // console.log(wkImage)
                // console.log(tpImage)
                // console.log(tpSummary)
                // console.log(cityRank)
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
                            className='show-city-button'
                            onClick={() => setShowInfo(!showInfo)}>{showInfo ? 'Hide Info' : `Show info`}
                        </button>

                        <div
                            ref={cityInfoContainer}
                            className={showInfo ? 'city-info-container slideout-active' : 'city-info-container'}>
                            <div className="wrapper">

                                <div className='city-info'>
                                    <h2>{cityName}</h2>

                                    <p>{wikiBlurb}.. <a target="_blank" rel="noopener noreferrer" href={`https://en.wikipedia.org/wiki/${cityName}`}>see more</a>
                                    </p >

                                    <div className='image-container'>
                                        <img src={tpPic} alt={`${cityName}`} />

                                        <img src={wikiPic} alt={`${cityName}`} />
                                    </div>

                                    <Graph chartData={chartData} />

                                    <p className='visually-hidden'>City Rankings per Category: Score out of 10: {tpMetrics} / 10</p>

                                    <p>{tpBlurb}</p>

                                </div >


                            </div >
                        </div>
                    </div >
                    :
                    null
            }
        </>
    )
}