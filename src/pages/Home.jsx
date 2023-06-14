import { Link } from "react-router-dom";
import React, { useEffect } from 'react';
import '../style/home.scss'

function Home() {

    function switchCharacter(character) {
        // Delete all active classes
        let allCharInfo = document.querySelectorAll('[class^=\'character-info-\']')
        let allCharLine = document.querySelectorAll('[class^=\'character-\']')
        for (let i = 0; i < allCharInfo.length; i++) {
            allCharInfo[i].classList.remove('active')
        }
        for (let i = 0; i < allCharLine.length; i++) {
            allCharLine[i].classList.remove('active')
        }
        
        // Add active class
        let selectedCharInfo = document.getElementsByClassName(`character-info-${character}`)[0]
        let selectedCharLine = document.getElementsByClassName(`character-${character}`)[0]

        selectedCharInfo.classList.add('active')
        selectedCharLine.classList.add('active')
    }

    useEffect(() => {
        document.title = `Tilburg's Tales`
    }, [])

    return (
        <div className="home">
            <h1 className="title">Tilburg's Tales</h1>
            <p>Tilburg's Tales lets you explore the different aspects of Tilburg in an interactive way. By following the story of a friend group you will find the highlights and local spots.
                <br /> Watch the video below for an introduction to the story and the characters!</p>
          
            <div className="video-container">
                {/* <iframe className="video" width="420" height="315" src="https://www.youtube.com/embed/tgbNymZ7vqY"></iframe> */}
                <div className="video"><i>Video coming soon</i></div>
                <div className="character-choices">
                    <div className="character-ania"><img onClick={ () => switchCharacter('ania') } src="/img/characters/ania_profile.jpg"></img></div>
                    <div className="character-mei active"><img onClick={ () => switchCharacter('mei') } src="/img/characters/mei_profile.jpg"></img></div>
                    <div className="character-cesar"><img onClick={ () => switchCharacter('cesar') } src="/img/characters/cesar_profile.jpg"></img></div>
                    <div className="character-yasu"><img onClick={ () => switchCharacter('yasu') } src="/img/characters/yasu_profile.jpg"></img></div>
                    <div className="character-emmanuel"><img onClick={ () => switchCharacter('emmanuel') } src="/img/characters/emmanuel_profile.jpg"></img></div>
                </div>
            </div>

            <div className="character-info-emmanuel">
                <h2>Emmanuel | Local</h2>
                <a className="insta-icon" target="_blank" href="https://www.instagram.com/em.jumaa1999/"><img src="/img/icons/insta-icon.svg" alt="instagram link" /></a>
                <p className="intro">Show Off Your Inner Tilburg</p>
                <p>Hey dude, thanks for coming with me to discover Tilburg! Remember to bring your coolest but most comfortable clothes. Try to have an open mind and let yourself loose. Our trip might take like 4 hours depending on what you choose to do. Let’s gooooo!</p>
                {/* <div className="start-button"><Link to="/character" state={{ character: 'emmanuel', title: 'Show Off Your Inner Tilburg' }}>START</Link></div> */}
                <div className="start-button"><Link><i>Coming soon</i></Link></div>
            </div>
            <div className="character-info-ania">
                <h2>Ania | Party</h2>
                <a className="insta-icon" target="_blank" href="https://www.instagram.com/_ania.kowalski_/"><img src="/img/icons/insta-icon.svg" alt="instagram link" /></a>
                <p className="intro">A Little Party Never Killed Anyone</p>
                <p>Ania's exiting route will guide you to all the party places in Tilburg while solving a murder case!</p>
                <div className="start-button"><Link to="/character" state={{ character: 'ania', title: 'A Little Party Never Killed Anyone' }}>START</Link></div>
            </div>
            <div className="character-info-yasu">
                <h2>Yasu | Culture</h2>
                <a className="insta-icon" target="_blank" href="https://www.instagram.com/yass_hasegawa/"><img src="/img/icons/insta-icon.svg" alt="instagram link" /></a>
                <p className="intro">Unlock Tilburg's Cultural Secrets</p>
                <p>Hey! I’m Yasu, a 21 y/o Japanese guy and I’m preparing for a photo contest with Evi! To win the prize, I need to discover the cultural things in Tilburg! I’m interested in taking photos and I want to prove my ability to become a photographer. To do this, I need your help to take the craziest and best photos of cultural stuff with Hashtag! Follow my route and enjoy your journey in Tilburg!</p>
                <div className="start-button"><Link to="/character" state={{ character: 'yasu', title: 'Unlock Tilburg\'s Cultural Secrets' }}>START</Link></div>
                {/* <div className="start-button"><Link><i>Coming soon</i></Link></div> */}
            </div>
            <div className="character-info-mei active">
                <h2>Mei | Nature</h2>
                <a className="insta-icon" target="_blank" href="https://www.instagram.com/meiyu_explorer/"><img src="/img/icons/insta-icon.svg" alt="instagram link" /></a>
                <p className="intro">Lost and Found: Tilburg's Wild Adventure</p>
                <p>Hey! I’m Mei, a 20 y/o Chinese girl and Evi’s best friend! As a nature lover, I can’t wait to discover Tilburg from a greener perspective! But I lost my stuff after a crazy night and my mood has been quite low since then... Evi told me that she may have an idea of where my belongings are. Help me on my journey during this scavenger hunt and discover your wild side on this 2 hour scavenger hunt throughout Tilburg!</p>
                <div className="start-button"><Link to="/character" state={{ character: 'mei', title: 'Lost and Found: Tilburg\'s Wild Adventure' }}>START</Link></div>
            </div>
            <div className="character-info-cesar">
                <h2>Cesar | History</h2>
                <a className="insta-icon" target="_blank" href="https://www.instagram.com/cesarespinoza_2001/"><img src="/img/icons/insta-icon.svg" alt="instagram link" /></a>
                <p className="intro">A Pathway to Memories</p>
                <p>Hola! I'm Cesar, 21 years old and I study history. Follow me to become a true Tilburg expert! I hope to meet some locals and discover what they know about Tilburg. During the journey you will collect your own ‘Tilburg Expert’ certificate! You might spend around 2 to 3 hours with me!</p>
                <div className="start-button"><Link to="/character" state={{ character: 'cesar', title: 'A Pathway to Memories' }}>START</Link></div>
            </div>
        </div>
    );
}

export default Home;