import '../../style/extraPage.scss';

function Certificate({backFunction}) {
  return (
    <div className="certificate">
      <p className='back-btn' onClick={backFunction}>&lsaquo;</p>
      <h2>'Tilburg Expert' certificate</h2>
      <p>Coming soon! <br /> 
      This page is still under construction!</p>
    </div>
  );
}

export default Certificate;
