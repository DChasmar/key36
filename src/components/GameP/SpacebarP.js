import React, { useContext } from 'react'
import { AppContext } from '../../App';
import { FaCheck } from '../IconModule';

function Spacebar({ keyVal }) {
  const { setGameChosen} = useContext(AppContext);
  const selectLetter = () => {
    setGameChosen({gameChosen: false, gameNumber: ''});
  };

  let iconComponent = null;
  let iconColorClass = '';

  if (keyVal === 'check') {
    iconComponent = <FaCheck />;
    iconColorClass = 'check-color';
  }

  return (
      <div className={`key spacebar ${iconColorClass}`}  onClick={selectLetter}>
        {iconComponent}
      </div>
    )
}

export default Spacebar