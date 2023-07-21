import React, { useContext } from 'react'
import { KeyboardRContext } from './KeyboardR';

function Key({ keyVal, red, style }) {
  const { selectKey } = useContext(KeyboardRContext);
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