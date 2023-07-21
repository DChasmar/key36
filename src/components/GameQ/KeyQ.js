import React, { useContext } from 'react'
import { KeyboardQContext } from './KeyboardQ';

function Key({ keyVal, blue, run, style }) {
  const { selectKey } = useContext(KeyboardQContext);
  const chooseKey = () => {
    if (!run) {
        selectKey(keyVal);
    }};

  return (
      <div className={ run ? 'key run_key' : blue ? 'key blue_key' : 'key' } style={style} onClick={chooseKey}>
        {keyVal}
      </div>
    )
}

export default Key