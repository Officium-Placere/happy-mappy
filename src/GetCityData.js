// import React, { useRef, useState } from 'react';

// export default function GetCityData({ center }) {

//     const spinButton = useRef(null);
//     const [showInfo, setShowInfo] = useState(false);
//     const [wikiBlurb, setWikiBlurb] = useState()
//     const [wikiPic, setWikiPic] = useState()
//     const [tpBlurb, setTpBlurb] = useState()
//     const [tpMetrics, setTpMetrics] = useState()
//     const [tpPic, setTpPic] = useState()
//     const [cityName, setCityName] = useState()

//     async function getApiData() {
//         const firstAPI = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode?latitude=${center.lat}&longitude=${center.lng}&localityLanguage=en&key=bdc_e3a41bcc2937431191cc18382f3d5492`)
//             .then(response => response.json())
//             .then(data => data)

//         const cityObj = firstAPI.localityInfo.administrative.find((poiObj => poiObj.name === firstAPI.city))

//         // ID returned for coordinates is Sao Paulo state, so change id to Q174 for Sao Paulo city
//         let id = ''
//         cityObj.wikidataId === 'Q175' ? id = 'Q174' : id = cityObj.wikidataId;

//         const secondAPI = await fetch(`http://www.wikidata.org/w/api.php?action=wbgetentities&origin=*&ids=${id}&sitefilter=enwiki&format=json`)
//             .then(response => response.json())
//             .then(data => data)

//         const wikiTitle = secondAPI.entities[id].sitelinks.enwiki.title

//         const thirdAPI = await fetch(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${wikiTitle}&origin=*`)
//             .then(response => response.json())
//             .then(data => data)

//         // get wikiID out of the thirdAPI result so it's consistent on every call
//         const keys = Object.keys(thirdAPI.query.pages)[0]

//         const extract = (thirdAPI.query.pages[keys].extract)
//         // save first 3 sentences of extract into blurb
//         const blurb = extract.match(/[^.]*.[^.]*.[^.]*./)[0]

//         // fetch main image from wiki article
//         const fourthAPI = await fetch(`https://en.wikipedia.org/w/api.php?action=query&origin=%2A&pithumbsize=800&prop=pageimages&titles=${wikiTitle}&format=json`)
//             .then(response => response.json())
//             .then(data => data)

//         // get wikiID out of fourthAPI
//         const imageKey = Object.keys(fourthAPI.query.pages)[0]
//         const imageLink = (fourthAPI.query.pages[imageKey].thumbnail.source)

//         // FIND CITY VIA COORDS TO GET CORRECT CITY NAME IN TELEPORT, AND THEN FIND IMAGE AFTER
//         const teleportCity = await fetch(`https://api.teleport.org/api/locations/${center.lat},${center.lng}/`)
//             .then(response => response.json())
//             .then(data => data);

//         const nearestCity = Object.entries(teleportCity._embedded)
//         const nearestCityName = nearestCity[0];
//         const cName = Object.entries(nearestCityName[1][0]._links)
//         const tpCity = cName[0][1].name

//         // remove 'city' from the name, when it's not Mexico City, ie for New York City as API lists NYC as New York
//         const editedCityName = [];
//         let cityLowerCase = '';
//         tpCity === 'Mexico City'
//             ?
//             cityLowerCase = tpCity.toLowerCase().split(' ').join('-')
//             :
//             tpCity.toLowerCase().split(' ').map((word) => {
//                 if (word !== 'city') {
//                     editedCityName.push(word)
//                 }
//                 cityLowerCase = editedCityName.join('-');
//                 return cityLowerCase;
//             })

//         // remove accents from the city name (ie Sao Paulo)
//         let cityASCII = ''
//         function removeAccents(str) {
//             cityASCII = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
//             return cityASCII
//         }
//         removeAccents(cityLowerCase)

//         const teleportImg = await fetch(`https://api.teleport.org/api/urban_areas/slug:${cityASCII}/images/`)
//             .then(response => response.json())
//             .then(data => data);
//         const tpPhoto = teleportImg.photos[0].image.mobile

//         const teleportBlurb = await fetch(`https://api.teleport.org/api/urban_areas/slug:${cityASCII}/scores/`)
//             .then(response => response.json())
//             .then(data => data);

//         const citySummary = teleportBlurb.summary;
//         // NOTE: for Moscow- there's a byline in <i> tags above the blurb, we might want to cut it out..?

//         const cityRanking = teleportBlurb.categories
//         const cityRank = cityRanking.map((category) => {
//             return `${category.name}: ${category.score_out_of_10.toFixed(2)} / 10`
//         })

//         const regex = /(<([^>]+)>)/ig;
//         const tpSummary = citySummary.replace(regex, '');
//         setTpBlurb(tpSummary)
//         setWikiBlurb(blurb);
//         setWikiPic(imageLink)
//         setTpMetrics(cityRank)
//         setTpPic(tpPhoto)
//         setCityName(wikiTitle)

//     }
//     getApiData()


//     return (
//         <section>
//             <button
//                 ref={spinButton}
//                 onClick={() => setShowInfo(!showInfo)}>{showInfo ? 'Hide city info' : 'Show city info'}
//             </button>

//             <div style={{ display: showInfo ? 'block' : 'none' }}>
//                 <p>{wikiBlurb}.. <a target="_blank" rel="noopener noreferrer" href={`https://en.wikipedia.org/wiki/${cityName}`}>see more</a>
//                 </p>

//                 <p>{tpMetrics}</p>
//                 <p>{tpBlurb}</p>

//                 <div>
//                     <img src={tpPic} alt={`${cityName}`} />
//                 </div>
//                 <div>
//                     <img src={wikiPic} alt={`${cityName}`} />
//                 </div>

//             </div>
//         </section>
//     )
// }