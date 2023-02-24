import React, { useState, useEffect } from 'react';
import Graph from './Graph';
import teleportCities from './teleportCities.json'

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

                const cityObj = firstAPI.localityInfo.administrative.find((poiObj => poiObj.name === firstAPI.city))

                // ID returned for coordinates is Sao Paulo state, so change id to Q174 for Sao Paulo city
                let id = ''
                cityObj.wikidataId === 'Q175' ? id = 'Q174' : id = cityObj.wikidataId;

                const secondAPI = await fetch(`http://www.wikidata.org/w/api.php?action=wbgetentities&origin=*&ids=${id}&sitefilter=enwiki&format=json`)
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
                let cityASCII = ''
                function removeAccents(str) {
                    cityASCII = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                    return cityASCII
                }
                removeAccents(cityLowerCase)

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