import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import '../style/character.scss';
import Chat from '../components/Chat';
import Overview from '../components/Overview';
import { useLocation } from 'react-router-dom';

function Character() {
  const [location, setLocation] = useState({ 'latitude' : 0, 'longitude' : 0, 'accuracy' : 0})
  const [chatActive, setchatActive] = useState(true)
  const [component, setComponent] = useState(<p>Loading...</p>)
  const properties = useLocation()

  // Add character class to main element for CSS styling
  useEffect(() => {
    let el = document.getElementsByClassName('characterPage')[0]
    el.classList.add('char-'+properties.state.character)

    document.title = `${properties.state.character.toLowerCase().replace(/\b[a-z]/g, letter => { return letter.toUpperCase()})}'s Route`
  }, [])

  useEffect(() => {
    if (chatActive) {
      setComponent(<Chat 
        location={location} 
        mainCharacter={properties.state.character} />)
    } else {
      setComponent(<Overview />)
    }
  }, [chatActive, location])

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
        <h1>{ properties.state.character }</h1>
        <p>{ properties.state.title }</p>
        <div className={chatActive ? 'btn active' : 'btn'}
          onClick={() => setchatActive(true)}>Chat</div>
        <div className={!chatActive ? 'btn active' : 'btn'}
          /* onClick={() => setchatActive(false)} */><i>WIP: Coming soon</i></div>
      </div>

      <div className='body'>
        {/* <button onClick={() => positionSucces({'coords' : { 'latitude' : 51.560925, 'longitude' : 5.083739, 'accuracy' : 0}})}>Location update</button> */}
        { component }
      </div>

      <a className='location' href={`https://www.openstreetmap.org/#map=20/${location.latitude}/${location.longitude}`} target='_blank'>
          <p>Coords: {location.latitude}, {location.longitude}</p>
          <p>Accuracy: {location.accuracy}</p>
      </a>
    </div>
  );
}

export default Character;
