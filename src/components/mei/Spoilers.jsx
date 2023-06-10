import '../../style/extraPage.scss';

function Spoilers({backFunction}) {
	function toggleSpoiler(number){
		// Show spoiler
		let spoilerAnswer = document.querySelectorAll(`.spoiler-${number}`)
		for (let i = 0; i < spoilerAnswer.length; i++) {
			spoilerAnswer[i].classList.add('show')
		}

		// Show next spoiler button
		let nextSpoiler = document.querySelectorAll(`.spoiler-${number+1}.btn`)
		for (let i = 0; i < nextSpoiler.length; i++) {
			nextSpoiler[i].classList.add('show')
		}
	}

  return (
    <div className="spoilers">
      <p className='back-btn' onClick={backFunction}>&lsaquo;</p>
      <h2>Spoilers</h2>
      <p>Here are the spoilers of Mei’s route, be careful while coming to this area, wild things can happen!</p>
      <div className='btn spoiler-1' onClick={() => toggleSpoiler(1)}>The Kempentoren spoiler</div>
      <p className='spoiler-1'>Code: H20198</p>
      <div className='btn spoiler-2' onClick={() => toggleSpoiler(2)}>Het Dorstige Hert spoiler</div>
      <p className='spoiler-2'>The coordinates lead to the Grotto Café</p>
      <div className='btn spoiler-3' onClick={() => toggleSpoiler(3)}>Grotto Café spoiler</div>
      <p className='spoiler-3'>Put the book in front of a mirror</p>
      <div className='btn spoiler-4' onClick={() => toggleSpoiler(4)}>Kinderboederij Wandelbos spoiler</div>
      <p className='spoiler-4'>Go to page 5 in the diary for the location</p>
    </div>
  );
}

export default Spoilers;
