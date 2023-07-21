import React, { useCallback, useContext, useEffect } from 'react'
import { AppContext } from '../App'

function Key({ keyVal, blue }) {
  const { chooseGame } = useContext(AppContext);
  
  const selectLetter = () => {
    chooseGame(keyVal);
    };


  return (
      <div className={blue ? 'key blue_key' : 'key'}  onClick={selectLetter}>
        {keyVal}
      </div>
    )
}

export default Key