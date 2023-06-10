import '../../style/extraPage.scss';

function LocalConvos({backFunction}) {
	function hasClass(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className+ ' ') > -1;
	}

	function toggleConvo(number) {
		// Hide all convo's except selected convo
		let allConvosEl = document.querySelectorAll(`[class *= 'convo-']`)
		console.log(allConvosEl);
		for (let i = 0; i < allConvosEl.length; i++) {
			if (i != number-1) {
				allConvosEl[i].classList.remove('show')
			}
		}

		// Toggle selected convo
		let convoEl = document.querySelector(`.convo-${number}`)
		console.log(convoEl);
		if (hasClass(convoEl, 'show')) {
			convoEl.classList.remove('show')
		} else {
			convoEl.classList.add('show')
		}
	}

  return (
    <div className="localConvos">
      <p className='back-btn' onClick={backFunction}>&lsaquo;</p>
      <h2>Talks with Locals</h2>
      <p>On this page you can follow Cesar's encounters with local Tilburgers</p>
      <div className='btn' onClick={() => toggleConvo(1)}>Spoorzone - Timo</div>
      <div className='convo-1'>
        <p>Timo:	</p><p>Hey! Hey, mag ik je wat vragen stellen?</p>
        <p>Cesar:	</p><p>Sorry? I can’t speak Dutch</p>
        <p>Timo:	</p><p>Oh, no worries. I’ll speak English, uhm.. Can I ask you come questions for a school project?</p>
        <p>Cesar:	</p><p>Sure, what’s it about?</p>
        <p>Timo:	</p><p>Let me introduce myself. I’m Timo. I study Journalism at the school just around the corner there. We have a project for which we need to write a text about a location in Tilburg, and I wanted to write about the Spoorzone and Tilburg’s industry.</p>
        <p>Cesar:	</p><p>Oh that sounds good! I’m not sure I can help you though..</p>
        <p>Timo:	</p><p>What do you mean?</p>
        <p>Cesar:	</p><p>I don’t know anything about Tilburg.. I’m visiting a friend here, and today I wanted to learn a bit more about Tilburg’s history</p>
        <p>Timo:	</p><p>Well, even if you can help me, I might be able to help you!</p>
        <p>Timo:	</p><p>I’ve been doing quite a bit of history research for my project, so I can tell you a bit about this area if you want?</p>
        <p>Cesar:	</p><p>That sounds great! I was looking around and saw all the cool refurbished factories here, do you know what they were used for?</p>
        <p>Timo:	</p><p>Yeah! Most of them used to be part of the Dutch railways, so they would store and fix up the trains in these buildings. If you look at the other side of the square there you see the food market right?</p>
        <p>Cesar:	</p><p>Yes?</p>
        <p>Timo:	</p><p>On the square you can see these rails in the floor, and just before the food market there is this round hole in the ground. That used to be a spinning platform to turn the trains around and put them on a different track!</p>
        <p>Cesar:	</p><p>I should check that out!</p>
        <p>Timo:	</p><p>Yes, for sure! </p>
        <p>Timo:	</p><p>The buildings in this area all had their own purpose, like building locomotives, metal working and wood working. Most of the buildings are still here, just with a new purpose. Like the LocHal here is a library slash study place, De Smederij, .. the smithery, is a club, the Culture Factory has music and a skating hall, and there is a lot of place for start-ups and stuff.</p>
        <p>Cesar:	</p><p>It’s so cool how the old industry and the new industry and culture mix here! I’m going to look around a bit more. Thanks!</p>
        <p>Timo:	</p><p>Your welcome! Have fun in Tilburg, there is a lot to see!</p>
      </div>
      <div className='btn' onClick={() => toggleConvo(2)}>De Heuvel - Emma</div>
      <div className='convo-2'>
				<p>Cesar:	</p><p>Hey, can I get a drink?</p>
				<p>Emma:	</p><p>Yeah, what would you want?</p>
				<p>Cesar:	</p><p>Hmm.. A white wine please</p>
				<p>Emma:	</p><p>Alright!</p>
				<p>Emma:	</p><p>Here you go</p>
				<p>Cesar:	</p><p>Thanks!</p>
				<p>Emma:	</p><p>Are you visiting here?</p>
				<p>Cesar:	</p><p>Yes! We have an international friend group and we visit one of our hometowns every year. So this time we went to Tilburg to visit a friend</p>
				<p>Emma:	</p><p>Oooh that so cool! But where are your friends?</p>
				<p>Cesar:	</p><p>Well.. Yesterday we went out and the friend we are visiting here wasn’t up for exploring the city just yet. So we split up and are all exploring the parts we find fun! I’m trying to visit all kinds of historical places.</p>
				<p>Emma:	</p><p>Ah, then I know something that might interest you! Do you already know something about the Linden tree?</p>
				<p>Cesar:	</p><p>Evi explained a little bit. It was really iconic right, but it was cut down. That’s about all I know..</p>
				<p>Emma:	</p><p>I was there when it was cut down! Together with a lot of other people of course, everyone knew about it.</p>
				<p>Cesar:	</p><p>What!</p>
				<p>Emma:	</p><p>First of they had to remove people from the tree, because there were some people who chained themselves to the tree! And then they came up with a big chainsaw, but when they started to saw the tree the church rang it’s bells in protest, and believe it or not… The chain of the saw broke! </p>
				<p>Cesar:	</p><p>No way!</p>
				<p>Emma:	</p><p>But they came up with another saw, but it wasn’t big enough to go through the whole tree, so they could only saw the outer part of the tree and not the middle. They had a big crane connected to the tree and after sawing they pulled it up.</p>
				<p>Cesar:	</p><p>So that was the end of it?</p>
				<p>Emma:	</p><p>You would think so, but no! The tree was hollow, and a smaller Linden tree was growing inside of it. And that tree sprung out! So naturally everyone thought they wouldn’t also remove the small one, because they cut down the big tree because they said it was dying.</p>
				<p>Cesar:	</p><p>Wait.. They kept going??</p>
				<p>Emma:	</p><p>Yes.. They took the small tree down too sadly. They did try to grow saplings from the old tree. Most died, but now on De Heuvel there is a tree which grew from the old one!</p>
				<p>Cesar:	</p><p>I saw that one! This was really cool to hear, thank you!</p>
				<p>Emma:	</p><p>Of course! I love talking about Tilburg stuff. Good luck with the rest of your tour, there is a lot left to see.</p>
				<p>Cesar:	</p><p>Thank you for the drink and the story!</p>
				<p>Emma:	</p><p>Byee</p>
      </div>
      <div className='btn' onClick={() => toggleConvo(3)}>Oude Dijk - Gerda</div>
      <div className='convo-3'>
				<p>Cesar:	</p><p>Hi, can I sit here?</p>
				<p>Gerda:	</p><p>Of course, I’ll move over a bit</p>
				<p>Cesar:	</p><p>Is that your dog?</p>
				<p>Gerda:	</p><p>Yes, his name is Boris. Isn’t he a good boy?</p>
				<p>Cesar:	</p><p>He sure is! This is a lovely park too.</p>
				<p>Gerda:	</p><p>I come here almost every day to walk Boris. Did you know most of this park used to be part of the abbey garden?</p>
				<p>Cesar:	</p><p>No I didn’t. Those gardens were quite big then?</p>
				<p>Gerda:	</p><p>They sure were! My aunt used to be a nun at the abbey, so she told me a bit about it. When she joined the abbey, hmmm.. That must be about 100 years ago.. wow.. Well, anyways, when she joined it was a much larger complex. They were fully self-sustainable, with gardens for food, a school, a hospital, everything.</p>
				<p>Cesar:	</p><p>Wow, that’s impressive.</p>
				<p>Gerda:	</p><p>You can still see quite a lot of catholic things all through Tilburg, like the churches, chapels, statues and some other things like the art work with the 3 nuns. You might have passed them.</p>
				<p>Cesar:	</p><p>Yeah, with the old pictures as faces you mean?</p>
				<p>Gerda:	</p><p>Yes, exactly! If you pay attention you can find a lot of history things hidden through Tilburg, just keep an eye out.</p>
				<p>Cesar:	</p><p>I will do that for sure!</p>
				<p>Boris:	</p><p>*barks*</p>
				<p>Gerda:	</p><p>Oh, Boris wants to move on hehe</p>
				<p>Cesar:	</p><p>Yes he does haha. It was very nice talking to you!</p>
				<p>Gerda:	</p><p>Have a good time in Tilburg!</p>
      </div>
      <div className='btn' onClick={() => toggleConvo(4)}>'t Heike - Gerda</div>
      <div className='convo-4'>
				<p>Cesar:	</p><p>Hey, do you know where I can find Marietje Kessels grave?</p>
				<p>Floris:</p><p>Yeah, let me walk you to it. Are you a tourist?</p>
				<p>Cesar:	</p><p>I’m visiting a friend here, and she told me about Marietje, so I wanted to pay my respects. But I couldn’t find it. She said pretty much everyone in Tilburg should know about her story. Do you know about it?</p>
				<p>Floris:</p><p>Marietje? Yeah I do. I learned about it at school, when they did the Marietje Kessels Project. </p>
				<p>Cesar:	</p><p>Oh, what’s that?</p>
				<p>Floris:</p><p>It’s like resilience training, mentally and physically so kids are better prepared is something happens.</p>
				<p>Cesar:	</p><p>That’s good!</p>
				<p>Floris:</p><p>Yes, it was really good. It is not the only thing to come out of what happened to Marietje Kessels. There was also a theatre play, a musical sort of thing, and a few books about the events.</p> 
				<p>Cesar:	</p><p>You can really see that this was a big event for Tilburg</p>
				<p>Floris:</p><p>Yes, for sure. It probably also helped that Marietje’s dad was the owner of a big factory where a lot of people worked, so the family name must have been quite known. There is actually a museum about the dad! Huis van Muziek it’s called.</p>
				<p>Cesar:	</p><p>Oh, I’m going there next!</p>
				<p>Floris:</p><p>Alright, here we are. This is her grave. I’ll leave you to it. And good luck on your route.</p>
				<p>Cesar:	</p><p>Oh, I was in the completely wrong place. Thank you!</p>
      </div>
    </div>
  );
}

export default LocalConvos;
