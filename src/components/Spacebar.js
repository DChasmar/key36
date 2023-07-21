import React, { useContext } from 'react'
import { AppContext } from '../App';

function Spacebar({ keyVal }) {
  const { setGameChosen } = useContext(AppContext);
  const selectLetter = () => {
    setGameChosen({gameChosen: false, gameNumber: ''});
    };
  

  return (
      <div className='spacebar' onClick={selectLetter}>
        {keyVal}
      </div>
    )
}

export default Spacebar