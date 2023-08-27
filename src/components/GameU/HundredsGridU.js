import React, { useContext } from 'react'
import HundredsUnit from './HundredsUnitU';
import { KeyboardUContext } from './KeyboardU';

function HundredsGrid() {
  const { numberArray, guess, xResponse } = useContext(KeyboardUContext);

  const chunkArray = (arr, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const rows = chunkArray(numberArray.slice(0, 100), 10);
  const nextIndex = numberArray.indexOf("");

  return (
    <div className='hundreds_box'>
      {rows.map((row, rowIndex) => (
        <div className={`hundreds_line${rowIndex + 1}`} key={`hundreds_line${rowIndex + 1}`}>
          {row.map((key, index) => {
            // Check if it's the nextValue
            const keyVal = rowIndex * 10 + index === nextIndex ? (xResponse || guess) : key;
            return (
            <HundredsUnit key={`hundreds_line${rowIndex + 1}-${index}`} 
            keyVal={keyVal}
            color={rowIndex*10 + index + 1} 
            next={rowIndex*10 + index === nextIndex} />
          )})}
        </div>
      ))}
    </div>
  )
}

export default HundredsGrid