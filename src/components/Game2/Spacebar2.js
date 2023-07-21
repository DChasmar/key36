import React, { useContext } from 'react'
import { AppContext } from '../../App';
import { Keyboard2Context } from './Keyboard2';

function Spacebar({ keyVal }) {
  const { setGameChosen} = useContext(AppContext);
  const { factorsList } = useContext(Keyboard2Context);
  const selectLetter = () => {
    localStorage.setItem('factorsList', JSON.stringify(factorsList));
    setGameChosen({gameChosen: false, gameNumber: ''});
    };

  return (
      <div className='key spacebar' onClick={selectLetter}>
        {keyVal}
      </div>
    )
}

export default Spacebar