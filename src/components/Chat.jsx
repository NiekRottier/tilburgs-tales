import { useEffect, useState } from 'react';
import '../style/chat.scss';
import emmanuelJson from '../assets/chats/emmanuel.json';
import aniaJson from '../assets/chats/ania.json';
import yasuJson from '../assets/chats/yasu.json';
import meiJson from '../assets/chats/mei.json';
import cesarJson from '../assets/chats/cesar.json';

function Chat({location, mainCharacter}) {
  const [chatJson, setChatJson] = useState({})
  const [chatActive, setChatActive] = useState(false)
  const [chatId, setChatId] = useState(0)
  const [messageId, setMessageId] = useState(0)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [currentLocation, setCurrentLocation] = useState(null)
  const [activeLocations, setActiveLocations] = useState([0])
  const [skipButtons, setSkipButtons] = useState(null)
  const [msgKey, setMsgKey] = useState(0)

  useEffect(() => {
    // console.log('ADD CHATJSON');
    if (mainCharacter === 'emmanuel') { setChatJson(emmanuelJson) } 
    else if (mainCharacter === 'ania') { setChatJson(aniaJson) }
    else if (mainCharacter === 'yasu') { setChatJson(yasuJson) }
    else if (mainCharacter === 'mei') { setChatJson(meiJson) }
    else if (mainCharacter === 'cesar') { setChatJson(cesarJson) }
  }, [])

  // Set cookies for saving the location
  useEffect(() => {
    if (currentLocation !== null) {
      document.cookie = `tilburgTales_${mainCharacter}_track=${currentTrack}`
      document.cookie = `tilburgTales_${mainCharacter}_location=${currentLocation}`
      // console.log(document.cookie);
    }
  }, [currentTrack, currentLocation])

  // Get cookie value
  function getCookie(key) {
    let cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(key))
      ?.split("=")[1];

    return cookieValue
  }

  function objIsEmpty(obj) {
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return false;
      }
    }
    return true;
  }

  useEffect(() => {
    let cookieTrack = parseInt(getCookie(`tilburgTales_${mainCharacter}_track`))
    let cookieLocation = parseInt(getCookie(`tilburgTales_${mainCharacter}_location`))

    if (!objIsEmpty(chatJson)){
      if(!isNaN(cookieTrack) && !isNaN(cookieLocation)) {
        if (cookieLocation !== null) {
          // console.log('ADD COOKIE DATA');
          setCurrentLocation(cookieLocation)
          setCurrentTrack(cookieTrack)
          let nextLocs = chatJson.locations[cookieLocation].nextLocations
          let checkedLocs = checkLocationTrack(nextLocs)
          setActiveLocations(checkedLocs)
        }
      } else {
        setCurrentLocation(0)
      }
    }
  }, [chatJson])

  // Checks position
  function checkPosition(check) {
    let locationDOM = document.querySelector('.location')
    console.log('Check location');
    if (check.lat-check.accuracy <= location.latitude && location.latitude <= check.lat+check.accuracy
      && check.long-check.accuracy <= location.longitude && location.longitude <= check.long+check.accuracy) {
        setCurrentLocation(check.location)
        locationDOM.classList.add('correct')
    } else {
      locationDOM.classList.remove('correct')
    }
  }

  // Checks if locations are part of the active track. Returns locations that are on the track
  function checkLocationTrack(locations) {
    let checkedLocs = []
    locations.forEach(loc => {
      if(chatJson.locations[loc].track.includes(currentTrack)){
        checkedLocs.push(loc)
      }
    });

    return checkedLocs
  }

  // When location updates, make checks for each location and then check them all
  useEffect(() => {
    console.log('Location update');
    if (!objIsEmpty(chatJson)) {
      let checkpoints = []
  
      // If true: create and add a check for the location
      activeLocations.forEach(activeLoc => {
        checkpoints.push({ 
          'location' : activeLoc,
          'lat' : chatJson.locations[activeLoc].lat,       // +/- 0.0001 = ~11m 
          'long' : chatJson.locations[activeLoc].long,     // +/- 0.0001 = ~7m
          'accuracy' : chatJson.locations[activeLoc].accuracy
        })
      });
  
      checkpoints.forEach(check => {
        // Check if there is a position
        if (check.lat && check.long && check.accuracy) {
          checkPosition(check)
        } else {
          setCurrentLocation(check.location)
        }
      })
    }
  }, [location])

  function showNextMessage() {
    // Get next message
    let chat = chatJson.locations[currentLocation].chats[chatId]
    let msg = chat.msgs[messageId]
    let els = [];

    // Create DOM element
    if (msg.type === 'text') {
      els.push(document.createElement('p'))
      els[0].innerHTML = msg.content
    } else if (msg.type === 'img') {
      els.push(document.createElement('img'))
      els[0].src = '/chat/img/'+mainCharacter+'/'+msg.content
    } else if (msg.type === 'video'){
      els.push(document.createElement('iframe'))
      els[0].controls = 'controls'
      els[0].src = msg.content
    } else if (msg.type === 'code'){
      els.push(document.createElement('input'))
      els[0].placeholder = 'Answer here...'
      els[0].addEventListener('input', (e) => {
        if (e.target.value === msg.content) {
          setMessageId(0)
          setChatId(prevId => prevId + 1)

          // Style input and remove it after 500ms
          els[0].classList.add('correct')
          setTimeout(() => {
            els[0].remove()
          }, 500)
        }
      })
    } else if (msg.type === 'choice'){
      for (let i = 0; i < msg.content.length; i++) {
        els.push(document.createElement('button'))
        els[i].innerHTML = msg.content[i].text
        els[i].addEventListener('click', () => {
          setCurrentTrack(msg.content[i].choice)
          setMessageId(0)
          setChatId(prevId => prevId + 1)

          // Remove buttons after choice
          els.forEach(el => {
            el.remove()
          })
        })
      }
    } else {
      console.warn('Unrecognised message type. Message not shown')
    }

    els.forEach(el => {
      el.dataset.character = msg.character
      if (msg.character === mainCharacter) {
        el.dataset.msgPosition = 'right'
      }
      el.dataset.key = msgKey
      setMsgKey(prevId => prevId + 1)
  
      let chatContainer = document.querySelector('.chat-char-'+chat.friend)

      // Put the senders name above their messages if the previous message wasn't theirs
      if (chatContainer.firstChild || chatContainer.firstChild === null) {
        if (msg.type !== 'choice' && msg.type !== 'code') {
          if(chatContainer.firstChild === null || el.dataset.msgPosition !== chatContainer.firstChild.dataset.msgPosition){
            let senderEl = document.createElement('small')
            senderEl.innerHTML = msg.character
            if (msg.character === mainCharacter) {
              senderEl.dataset.msgPosition = 'right'
            }
            chatContainer.insertBefore(senderEl, chatContainer.firstChild)
          }
        }
      }

      // Push DOM element
      chatContainer.insertBefore(el, chatContainer.firstChild)
    })
  }

  useEffect(() => {
    if(chatActive){ 
      // Check if the current track is represented in the chat
      let trackCorrect = false
      if (chatJson.locations[currentLocation].chats[chatId]) {
        chatJson.locations[currentLocation].chats[chatId].track.forEach(track => {
          if (track === currentTrack) {
            trackCorrect = true
          }
        })
      }

      if (trackCorrect) {
        // Stop when there are no messages left.
        let msgs = chatJson.locations[currentLocation].chats[chatId].msgs

        if (messageId < msgs.length) { // If there still messages
          showNextMessage()
          
          let msgType = msgs[messageId].type
          if (msgType !== "choice" && msgType !== "code") { // Pause if last msg was a choice or code
            setTimeout(() => {
              setMessageId(prevId => prevId + 1)
            }, 1000)
          }
        } else if (chatId+1 < chatJson.locations[currentLocation].chats.length) { // If there are still chats
          setChatId(prevId => prevId + 1)
          setMessageId(0)
        } else { // No more msgs or chats on this location
          // console.log('END OF LOCATION EVENTS - RESETTING');
          setMessageId(0)
          setChatId(0)
          setChatActive(false)
  
          let nextLocs = chatJson.locations[currentLocation].nextLocations
          let checkedLocs = checkLocationTrack(nextLocs)
          setActiveLocations(checkedLocs)
        }
      } else if(chatId+1 < chatJson.locations[currentLocation].chats.length){ // If there are still chats
        // console.log('NEXT CHAT');
        setChatId(prevId => prevId + 1)
        setMessageId(0)
      } else {
        // console.log('TRACK INCORRECT & NO MORE CHATS - RESETTING');
        setMessageId(0)
        setChatId(0)
        setChatActive(false)
      }
    }
  }, [messageId, chatId, chatActive])

  // Update locationId to the next location if location is correct
  useEffect(() => {
    if (currentLocation !== null) {
      console.log('CORRECT LOCATION | Location: '+currentLocation+' | Track: '+currentTrack);

      // If next location is on the right track, put it in activeLocations
      let nextLocs = chatJson.locations[currentLocation].nextLocations
      let checkedLocs = checkLocationTrack(nextLocs)
      setActiveLocations(checkedLocs) 
      setChatActive(true)
    }
  }, [currentLocation, currentTrack])

  function switchCharacter(character) {
    // Delete all active classes
    let allCharChat = document.querySelectorAll('[class^=\'chat-char-\']')
    let allCharLine = document.querySelectorAll('[class^=\'character-\']')
    for (let i = 0; i < allCharChat.length; i++) {
        allCharChat[i].classList.remove('active')
    }
    for (let i = 0; i < allCharLine.length; i++) {
        allCharLine[i].classList.remove('active')
    }
    
    // Add active class
    let selectedCharChat = document.getElementsByClassName(`chat-char-${character}`)[0]
    let selectedCharLine = document.getElementsByClassName(`character-${character}`)[0]

    selectedCharChat.classList.add('active')
    selectedCharLine.classList.add('active')
  }

  // TESTING BUTTONS
  useEffect(() => {
    setSkipButtons(null)
    if (!chatActive) {
      let buttons = []
      let key = 0
      activeLocations.forEach(nextLoc => {
        buttons.push(<button style={{margin: '0 auto 0.5rem', display: 'block'}} key={key} onClick={() => { 
          setCurrentLocation(nextLoc)
      }}>Go to location: {nextLoc}</button>)
        key++
      });
  
      setSkipButtons(buttons)
    }
  }, [activeLocations, chatActive])

  useEffect(() => {
    // Show chat characters
    let characters = ['evi', 'emmanuel', 'ania', 'yasu', 'mei', 'cesar']

    characters.forEach(char => {
      let chatChar = document.querySelector('.chat-char-'+char)
      let charPic = document.querySelector('.character-'+char)
      if(chatChar.children.length > 0){
        charPic.classList.add('visible')
      }
    })
  }, [activeLocations, messageId])

  // Decide which chat should be active initially
  useEffect(() => {
    if (!objIsEmpty(chatJson) && currentLocation !== null) {
      // Delete all active classes
      let allCharChat  = document.querySelectorAll('[class^=\'chat-char-\']')
      let allCharLine = document.querySelectorAll('[class^=\'character-\']')
      for (let i = 0; i < allCharChat.length; i++) {
          allCharChat[i].classList.remove('active')
      }
      for (let i = 0; i < allCharLine.length; i++) {
          allCharLine[i].classList.remove('active')
      }

      let characters = ['evi', 'emmanuel', 'ania', 'yasu', 'mei', 'cesar']

      characters.forEach(char => {
        let chatChar = document.querySelector('.chat-char-'+char)
        let charPic = document.querySelector('.character-'+char)
        if(chatJson.locations[currentLocation].chats[0].friend === char){
          chatChar.classList.add('active')
          charPic.classList.add('active')
        }
      })
    }
  }, [chatJson, currentLocation])

  useEffect(() => {
    if (!objIsEmpty(chatJson) && currentLocation !== null) {
      // console.log(currentLocation + ' | ' +chatJson.locations.length);
      if (currentLocation+1 === chatJson.locations.length) {
        document.querySelector('.final-text').classList.add('active')
        document.title = `${mainCharacter.toLowerCase().replace(/\b[a-z]/g, letter => { return letter.toUpperCase()})}'s Route - Final`
      } else {
        document.querySelector('.final-text').classList.remove('active')
      }
    } else {
      document.querySelector('.final-text').classList.remove('active')
    }
  }, [currentLocation])

  function resetRoute() {
    // Clear all chats and active classes
    let characters = ['evi', 'emmanuel', 'ania', 'yasu', 'mei', 'cesar']

    characters.forEach(char => {
      let chatChar = document.querySelector('.chat-char-'+char)
      let charPic = document.querySelector('.character-'+char)

      chatChar.classList.remove('active', 'visible')
      while (chatChar.lastElementChild) {
        chatChar.removeChild(chatChar.lastElementChild);
      }
      charPic.classList.remove('active', 'visible') 
    })
    
    // Reset cookies
    document.cookie = `tilburgTales_${mainCharacter}_location` +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = `tilburgTales_${mainCharacter}_track` +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    
    // Reset location and track
    setCurrentLocation(0)
    setCurrentTrack(0)
  }

  return (
    <div className='chat'>
      {/* { skipButtons } */}

      <div className="character-choices">
        <div className="character-evi"><img onClick={ () => switchCharacter('evi') } src="/img/characters/evi_profile.jpg"></img></div>
        <div className="character-emmanuel"><img onClick={ () => switchCharacter('emmanuel') } src="/img/characters/emmanuel_profile.jpg"></img></div>
        <div className="character-ania"><img onClick={ () => switchCharacter('ania') } src="/img/characters/ania_profile.jpg"></img></div>
        <div className="character-yasu"><img onClick={ () => switchCharacter('yasu') } src="/img/characters/yasu_profile.jpg"></img></div>
        <div className="character-mei"><img onClick={ () => switchCharacter('mei') } src="/img/characters/mei_profile.jpg"></img></div>
        <div className="character-cesar"><img onClick={ () => switchCharacter('cesar') } src="/img/characters/cesar_profile.jpg"></img></div>
      </div>

      <div className="chat-char-evi"></div>
      <div className="chat-char-emmanuel"></div>
      <div className="chat-char-ania"></div>
      <div className="chat-char-yasu"></div>
      <div className="chat-char-mei"></div>
      <div className="chat-char-cesar"></div>
      
      <div className="final-text">
        <p><b>Well done! <br /> 
        You have finished { mainCharacter.toLowerCase().replace(/\b[a-z]/g, letter => { return letter.toUpperCase()}) }'s route.</b> <br /> <br />
        Feel free to continue exploring Tilburg or follow another character's route. <br />
        If you wish to reset this route, click the button below.</p>
        <div className={`btn-finish-${mainCharacter}`} onClick={resetRoute}>Reset { mainCharacter.toLowerCase().replace(/\b[a-z]/g, letter => { return letter.toUpperCase()}) }'s route</div>
      </div>
    </div>
  );
}

export default Chat;