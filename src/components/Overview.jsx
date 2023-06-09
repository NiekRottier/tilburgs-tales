import { useEffect, useState } from 'react';
import '../style/overview.scss';
import ComingSoon from './ComingSoon'
import GoWild from './mei/GoWild'
import Spoilers from './mei/Spoilers'

function Overview({mainCharacter}) {
  const buttonsEl = <div className="button-container">
    <div className="buttons--emmanuel">
      <a className="btn" target="_blank" href="https://www.instagram.com/em.jumaa1999/"><img src="/img/icons/insta-icon-white.svg" alt="instagram icon" />Check my Insta</a>
      <a className="btn" onClick={() => setActiveEl(<ComingSoon backFunction={() => setActiveEl(buttonsEl)} />)}>Filters</a>
    </div>
    <div className="buttons--ania">
      <a className="btn" target="_blank" href="https://www.instagram.com/_ania.kowalski_/"><img src="/img/icons/insta-icon-white.svg" alt="instagram icon" />Check my Insta</a>
      <a className="btn" onClick={() => setActiveEl(<ComingSoon backFunction={() => setActiveEl(buttonsEl)} />)}>Evidence</a>
    </div>
    <div className="buttons--yasu">
      <a className="btn" target="_blank" href="https://www.instagram.com/yass_hasegawa/"><img src="/img/icons/insta-icon-white.svg" alt="instagram icon" />Check my Insta</a>
      <a className="btn" onClick={() => setActiveEl(<ComingSoon backFunction={() => setActiveEl(buttonsEl)} />)}>Photo Gallery</a>
    </div>
    <div className="buttons--mei">
      <a className="btn" target="_blank" href="https://www.instagram.com/meiyu_explorer/"><img src="/img/icons/insta-icon-white.svg" alt="instagram icon" />Check my Insta</a>
      <a className="btn" onClick={() => setActiveEl(<GoWild backFunction={() => setActiveEl(buttonsEl)} />)}>Go Wild!</a>
      <a className="btn" onClick={() => setActiveEl(<Spoilers backFunction={() => setActiveEl(buttonsEl)} />)}>Spoilers</a>
    </div>
    <div className="buttons--cesar">
      <a className="btn" target="_blank" href="https://www.instagram.com/cesarespinoza_2001/"><img src="/img/icons/insta-icon-white.svg" alt="instagram icon" />Check my Insta</a>
      <a className="btn" onClick={() => setActiveEl(<ComingSoon backFunction={() => setActiveEl(buttonsEl)} />)}>Talks with Locals</a>
      <a className="btn" onClick={() => setActiveEl(<ComingSoon backFunction={() => setActiveEl(buttonsEl)} />)}>My Expert Certificate</a>
    </div>
  </div>

  const [activeEl, setActiveEl] = useState(buttonsEl)
  
  useEffect(() => {
    let buttonsEl = document.querySelectorAll(`.buttons--${mainCharacter}`)
    for (let i = 0; i < buttonsEl.length; i++) {
      buttonsEl[i].classList.add('active')
    }
  }, [activeEl])

  return (
    <div className="overview">
      {activeEl}
    </div>
  );
}

export default Overview;
