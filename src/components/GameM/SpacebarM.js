import React, { useContext } from 'react'
import { AppContext } from '../../App';
import { FaCheck, FaTimes } from '../IconModule';

function Spacebar({ keyVal }) {
    const { setGameChosen } = useContext(AppContext);
    const selectLetter = () => {
      setGameChosen({gameChosen: false, gameNumber: ''});
      };

    let iconComponent = null;
    let iconColorClass = '';

    if (keyVal === 'check') {
        iconComponent = <FaCheck />;
        iconColorClass = 'check-color';
    } else if (keyVal === 'times') {
        iconComponent = <FaTimes />;
        iconColorClass = 'times-color';
    } else {
        iconComponent = keyVal;
        if (keyVal > 0) {
            iconColorClass = 'check-color';
        } else if (keyVal < 0) {
            iconColorClass = 'times-color';
        }
    }
  

    return (
        <div className={`key spacebar ${iconColorClass}`} onClick={selectLetter}>
          {iconComponent}
        </div>
    )
}

export default Spacebar