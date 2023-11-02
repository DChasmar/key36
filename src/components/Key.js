import React, { useContext } from 'react'
import { AppContext } from '../App'
import { FaCheck } from './IconModule';

function Key({ keyVal, blue, game }) {
  const { chooseGame } = useContext(AppContext);
  
  const selectLetter = () => {
    chooseGame(keyVal);
  };

  let fillColor = null;

  if (game === 'WORDS') {
    fillColor = '#888';
  } else if (game === 'SCRABBY') {
    fillColor = '#efc18d';
  } else if (game === 'NUMBERS') {
    fillColor = '#d99916';
  } else if (game === 'MAZE') {
    fillColor = '#89d5ff';
  } else if (game === 'ANAGRAM') {
    fillColor = '#f7da21';
  } else if (game === 'PUZZLE') {
    fillColor = '#e07ba1';
  } else if (game === 'WORDLE') {
    fillColor = '#67ae4d';
  } else if (game === '100 GRID') {
    fillColor = '#23a7fa';
  } else if (game === 'CURIOUS') {
    fillColor = '#7d71d7';
  } else if (game === '1 VOWEL') {
    fillColor = '#63b9ab';
  } else if (game === 'LOGIC') {
    fillColor = '#d22c35';
  } else {
    fillColor = '#444';
  }  

  return (
      <div>
        {/* <div className={blue ? 'key blue_key' : 'key'}  onClick={selectLetter}> */}
        <div className='key' style={{backgroundColor: fillColor, border: '0px'}} onClick={selectLetter}>
          {/* Centered text */}
          <div className="centered-text-main">{keyVal}</div>
          {/* Text in the bottom-right corner */}
          <div className="bottom-text-main">{game}</div>
          {blue ? <div className="bottom-left-main-back"/> : undefined}
          <div className="bottom-left-main">{blue ? <FaCheck /> : undefined}</div>
        </div>
        
      </div>
    )
}

export default Key