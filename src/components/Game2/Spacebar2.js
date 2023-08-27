import React, { useContext } from 'react'
import { AppContext } from '../../App';
import { FaCheck, FaTimes } from '../IconModule';

function Spacebar({ keyVal }) {
  const { setGameChosen} = useContext(AppContext);
  const selectLetter = () => {
    // localStorage.setItem('factorsList', JSON.stringify(factorsList));
    setGameChosen({gameChosen: false, gameNumber: ''});  
  };

  let iconComponent = null;
  let iconColorClass = '';

  if (keyVal === 'check') {
    iconComponent = <FaCheck />;
    iconColorClass = 'check-color';
  } else {
    iconComponent = keyVal;
  }

  return (
      <div className={`key spacebar ${iconColorClass}`} onClick={selectLetter}>
        {iconComponent}
      </div>
    )
}

export default Spacebar