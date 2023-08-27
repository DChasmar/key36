import React, { useContext } from 'react'
import HundredsUnit from './HundredsUnitJ';
import { KeyboardJContext } from './KeyboardJ';

function HundredsGrid() {
  const { colorArray } = useContext(KeyboardJContext);

  const hundredArray = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
    "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
    "21", "22", "23", "24", "25", "26", "27", "28", "29", "30",
    "31", "32", "33", "34", "35", "36", "37", "38", "39", "40",
    "41", "42", "43", "44", "45", "46", "47", "48", "49", "50",
    "51", "52", "53", "54", "55", "56", "57", "58", "59", "60",
    "61", "62", "63", "64", "65", "66", "67", "68", "69", "70",
    "71", "72", "73", "74", "75", "76", "77", "78", "79", "80",
    "81", "82", "83", "84", "85", "86", "87", "88", "89", "90",
    "91", "92", "93", "94", "95", "96", "97", "98", "99", "100"
    ];

  const chunkArray = (arr, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const rows = chunkArray(hundredArray.slice(0, 100), 10);
  const nextIndex = colorArray.indexOf("");

  return (
    <div className='hundreds_box'>
      {rows.map((row, rowIndex) => (
        <div className={`hundreds_line${rowIndex + 1}`} key={`hundreds_line${rowIndex + 1}`}>
          {row.map((key, index) => {
            // Check if it's the nextValue
            return (
            <HundredsUnit key={`hundreds_line${rowIndex + 1}-${index}`} 
            keyVal={key}
            color={colorArray[rowIndex*10 + index]}
            next={rowIndex*10 + index === nextIndex} />
          )})}
        </div>
      ))}
    </div>
  )
}

export default HundredsGrid