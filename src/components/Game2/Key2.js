import React, { useContext } from 'react'
import { Keyboard2Context } from './Keyboard2';
import { GoDotFill } from '../IconModule';

function Key({ keyVal, blank, black, clickableKey, add, keyLine }) {
  const { addNumber, removeNumber } = useContext(Keyboard2Context);
  const selectLetter = () => {
    if (clickableKey) {
      if (add) {
        addNumber(keyVal);
      } else {
        removeNumber()
      }
    }
  };

  let iconComponent = null;

  if (keyLine === 1 && keyVal === "") {
    iconComponent = <GoDotFill />;
  } else {
    iconComponent = keyVal;
  }

  return (
      <div className={ blank ? 'key blank_key default_cursor' :  black ? 'key factors_key' : 'key'} onClick={selectLetter}>
        {iconComponent}
      </div>
    )
}

export default Key