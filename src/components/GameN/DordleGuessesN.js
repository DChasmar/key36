import React, { useContext } from 'react'
import DordleBox from './DordleBoxN';
import { KeyboardNContext } from './KeyboardN';

function DordleGuesses() {
    const { guesses, guessColors } = useContext(KeyboardNContext);
    
    const nineGuesses1 = [...guesses[0], ...guesses[3]];
    const nineGuesses2 = [...guesses[1], ...guesses[4]];
    const nineGuesses3 = [...guesses[2], ...guesses[5]];

    const nineGuessColors1 = [...guessColors[0], ...guessColors[3]];
    const nineGuessColors2 = [...guessColors[1], ...guessColors[4]];
    const nineGuessColors3 = [...guessColors[2], ...guessColors[5]];

    return (
      <div className='dordle_box'>
        <div className='mini_line1'>
          {nineGuesses1.map((key, index) => {
          const uniqueKey = `mini_line1-${index}`;
          return (
            <React.Fragment key={uniqueKey}>
              <DordleBox keyVal={key} color={nineGuessColors1[index]} />
              {index === 4 && <div className='divider mini_divider'>|</div>}
            </React.Fragment>
          );
        })}</div>
        <div className='mini_line2'>
          {nineGuesses2.map((key, index) => {
          const uniqueKey = `mini_line2-${index}`;
          return (
            <React.Fragment key={uniqueKey}>
              <DordleBox keyVal={key} color={nineGuessColors2[index]} />
              {index === 4 && <div className='divider mini_divider'>|</div>}
            </React.Fragment>
          );
        })}</div>
        <div className='mini_line3'>
          {nineGuesses3.map((key, index) => {
          const uniqueKey = `mini_line3-${index}`;
          return (
            <React.Fragment key={uniqueKey}>
              <DordleBox keyVal={key} color={nineGuessColors3[index]} />
              {index === 4 && <div className='divider mini_divider'>|</div>}
            </React.Fragment>
          );
        })}</div>
      </div>
    )
}

export default DordleGuesses