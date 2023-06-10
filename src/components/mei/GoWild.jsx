import '../../style/extraPage.scss';

function GoWild({backFunction}) {
  return (
    <div className="goWild">
      <p className='back-btn' onClick={backFunction}>&lsaquo;</p>
      <h2>Go Wild!</h2>
      <p className='intro-evi'><i>Hey there! Here's a list of places you can explore on your own. Go wild Mei!</i><br /> 
        ~ Evi</p>

    <p><b>Parks:</b></p>
    <ul>
        <li><a target='_blank' href="https://goo.gl/maps/2kPLkYMKkp3LDHeV6">City Park 'Oude Dijk'</a></li>
        <li><a target='_blank' href="https://goo.gl/maps/G826ykVEASaD1zd8A">Reeshofbos</a></li>
        <li><a target='_blank' href="https://goo.gl/maps/bhhftAhxhcPUwNk49">Kromhoutpark</a></li>
        <li><a target='_blank' href="https://goo.gl/maps/VfvCUpeW1gLPDUpNA">Vlonder Kop van de Piushaven</a></li>
    </ul>
    <p><b>Thrift shops:</b></p>
    <ul>
        <li><a target='_blank' href="https://goo.gl/maps/FWzo6HbeZjC9PEeTA">Rijkers Conceptstore</a></li>
        <li><a target='_blank' href="https://goo.gl/maps/2TVxiBvHhKza79AV6">Vincentiusvereninging</a></li>
        <li><a target='_blank' href="https://goo.gl/maps/TCSxxLGhKJyrF5wp7">Kringloop</a></li>
        <li><a target='_blank' href="https://goo.gl/maps/SuX3WpAYfxHYiGGeA">La Poubelle</a></li>
    </ul>
    </div>
  );
}

export default GoWild;
