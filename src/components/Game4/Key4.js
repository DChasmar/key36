import React, { useContext } from 'react'
import { Keyboard4Context } from './Keyboard4';

function Key({ keyVal, blue, hide, style }) {
  const { selectKey } = useContext(Keyboard4Context);
  const chooseKey = () => {
    if (!hide) {
        selectKey(keyVal);
    }};

  return (
      <div className={ hide ? 'key run_key' : blue ? 'key blue_key' : 'key' } style={style} onClick={chooseKey}>
        {keyVal}
      </div>
    )
}

export default Key