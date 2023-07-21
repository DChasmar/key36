import React, { useContext } from 'react'
import { Keyboard5Context } from './Keyboard5';

function Key({ keyVal, red, style }) {
  const { selectKey } = useContext(Keyboard5Context);
  const chooseKey = () => {
    selectKey(keyVal);
    };

  return (
      <div className={red ? 'key red_key' : 'key blue_key'} style={style} onClick={chooseKey}>
        {keyVal}
      </div>
    )
}

export default Key