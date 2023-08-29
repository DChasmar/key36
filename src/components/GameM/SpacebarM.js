import React, { useContext } from 'react'
import { AppContext } from '../../App';
import { KeyboardMContext } from './KeyboardM';
import { FaCheck, FaTimes } from '../IconModule';

function Spacebar({ keyVal }) {
    const { setGameChosen } = useContext(AppContext);
    const { total } = useContext(KeyboardMContext);
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
        iconComponent = total || 0;
        iconColorClass = 'black';
    }
  

    return (
        <div className={`key spacebar ${iconColorClass}`} onClick={selectLetter}>
          {iconComponent}
        </div>
    )
}

export default Spacebar