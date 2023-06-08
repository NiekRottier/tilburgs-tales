import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import '../style/character.scss';
import Chat from '../components/Chat';
import Overview from '../components/Overview';
import { useLocation } from 'react-router-dom';

function Character() {
  const properties = useLocation()
  const [location, setLocation] = useState({ 'latitude' : 0, 'longitude' : 0, 'accuracy' : 0})
  const [chatActive, setChatActive] = useState(true)
  const [component, setComponent] = useState(<p>Loading...</p>)
  const [character, setCharacter] = useState(properties.state ? properties.state.character : 'cesar')
  const [title, setTitle] = useState(properties.state ? properties.state.title : 'A Pathway to Memories')

  // Add character class to main element for CSS styling
  useEffect(() => {
    let el = document.getElementsByClassName('characterPage')[0]
    el.classList.add('char-'+character)
  
    document.title = `${character.toLowerCase().replace(/\b[a-z]/g, letter => { return letter.toUpperCase()})}'s Route`
  }, [])
  
  useEffect(() => {

  }, [character])

  useEffect(() => {
    if (chatActive) {
      setComponent(<Chat 
        location={location} 
        mainCharacter={character} />)
    } else {
      setComponent(<Overview
        mainCharacter={character} />)
    }
  }, [chatActive, location, character])

  function getPosition(){
    if ("geolocation" in navigator) {
      let options = { enableHighAccuracy: true }

      navigator.geolocation.watchPosition(positionSucces, (err) => console.warn(`ERROR(${err.code}): ${err.message}`), options)
    } else {
      console.warn('No location available.')
    }
  }

  getPosition()
  
  function positionSucces(position){
    // console.log(position.coords);
    if(position.coords.accuracy < 30){
      setLocation(position.coords)
      console.log('New position');
    } else {
      // console.log('Not accurate');
    }
  }

  return (
    <div className='characterPage'>
      <div className='header'>
        <div className="btn-back"><Link to="/">&lsaquo;</Link></div>
        <h1>{ character }</h1>
        <p>{ title }</p>
        <div className={chatActive ? 'btn active' : 'btn'}
          onClick={() => setChatActive(true)}>Chat</div>
        <div className={!chatActive ? 'btn active' : 'btn'}
          onClick={() => setChatActive(false)}>Extra's</div>
      </div>

      <div className='body'>
        {/* <button onClick={() => positionSucces({'coords' : { 'latitude' : 51.560925, 'longitude' : 5.083739, 'accuracy' : 0}})}>Location update</button> */}
        { component }
      </div>

      <footer>
        <p>&copy; DVANC - 2023</p>
      </footer>
    </div>
  );
}

export default Character;
