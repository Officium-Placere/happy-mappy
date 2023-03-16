import React, { useRef, useState } from 'react';

export default function Introduction() {

    const [introModal, setIntroModal] = useState(false); // show intro on page mount

    const introRef = useRef(null);

    const showIntro = () => {
        setIntroModal(!introModal)

        if(introModal === true){
            introRef.current.classList.add('slideOutIntro');
            introRef.current.classList.remove('slideInIntro');
            
        } else {
            introRef.current.classList.remove('slideOutIntro');
            introRef.current.classList.add('slideInIntro');
        }
    }

    return (


        <>

            <div className="wrapper">
                    <button 
                    className='introButton'
                    onClick={() => showIntro()}>{introModal ? `close` : `what's this about?`}</button>

                <div 
                ref={introRef}
                className='intro'>
                    <h1>Globe Spinner</h1>
                    <p>Wondering where to travel to next? Globe Spinner can help! Simply click the 'spin globe' and watch the globe spin to a random city. Once the map zooms into a city, click the 'Show City Info' button to find out more about it!</p>
                </div>
            </div>

        </>
    )
}