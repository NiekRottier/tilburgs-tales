import '../style/comingsoon.scss';

function Overview({backFunction}) {
  return (
    <div className="comingsoon">
      <p className='back-btn' onClick={backFunction}>&lsaquo;</p>
      <h2>Coming soon!</h2>
      <p>Coming soon! <br /> 
      This page is still under construction!</p>
    </div>
  );
}

export default Overview;
