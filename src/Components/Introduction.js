import React, { useRef, useState, useEffect } from 'react';

export default function Introduction() {

    const [introModal, setIntroModal] = useState(false); // show intro on page mount

    const introRef = useRef(null);
    const introButton = useRef(null);

    useEffect(() => {

        let timer = setTimeout(() => showIntro(), 1400);

        return () => {
            clearTimeout(timer);
        }
    }, [])

    const showIntro = () => {
        setIntroModal(true)
        introButton.current.classList.add('hideIntroButton')
        introRef.current.classList.remove('slideOutIntro');
        introRef.current.classList.add('slideInIntro');
    }

    const closeIntro = () => {
        setIntroModal(false)

        introButton.current.classList.remove('hideIntroButton')
        introRef.current.classList.add('slideOutIntro')
        introRef.current.classList.remove('slideInIntro')

    }
    // if introModal is true, ie it's being shown then add like an opacity over everything else (overlay) to prevent it from being clicked - up in app.js

    return (
        <>
            <div className="wrapper">
                <button ref={introButton} className='introButton' onClick={() => showIntro()}>what's this about?</button>

                { introModal ? <div className="overlay"></div> : null }
                <div ref={introRef} className='intro'>
                    <button className='closeButton' onClick={() => closeIntro()}>x</button>
                    <h1>Globe Spinner</h1>
                    <p>Wondering where to travel to next? Click the 'Spin Globe' button and watch the globe spin to a random city in the world, then click the 'Show City Info' button to find out more about it!</p>
                </div>

            </div>

        </>
    )
}