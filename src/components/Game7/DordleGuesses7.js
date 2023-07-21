import React, { useContext } from 'react'
import DordleBox from './DordleBox7';
import { Keyboard7Context } from './Keyboard7';

function DordleGuesses() {
  const { guesses, guessColors, turnCounter } = useContext(Keyboard7Context);
  

  return (
    <div className='dordle_box'>
      <div className='mini_line1'>
        {guesses[0].map((key, index) => {
        const uniqueKey = `mini_line1-${index}`;
        return (
          <React.Fragment key={uniqueKey}>
            <DordleBox keyVal={key} color={guessColors[0][index]} />
            {index === 4 && turnCounter < 3 && <div className='divider mini_divider'>|</div>}
          </React.Fragment>
        );
      })}</div>
      <div className='mini_line2'>
        {guesses[1].map((key, index) => {
        const uniqueKey = `mini_line2-${index}`;
        return (
          <React.Fragment key={uniqueKey}>
            <DordleBox keyVal={key} color={guessColors[1][index]} />
            {index === 4 && turnCounter < 3 && <div className='divider mini_divider'>|</div>}
          </React.Fragment>
        );
      })}</div>
      <div className='mini_line3'>
        {guesses[2].map((key, index) => {
        const uniqueKey = `mini_line3-${index}`;
        return (
          <React.Fragment key={uniqueKey}>
            <DordleBox keyVal={key} color={guessColors[2][index]} />
            {index === 4 && turnCounter < 3 && <div className='divider mini_divider'>|</div>}
          </React.Fragment>
        );
      })}</div>
    </div>
  )
}

export default DordleGuesses