import React, { useContext } from 'react'
import TriangleUnit from './TriangleUnitP';
import { KeyboardPContext } from './KeyboardP';

function Triangle() {
    const { numberArray, pascalsTriangle, guess, xResponse } = useContext(KeyboardPContext);

    let newNumberArray = [...numberArray];
    let emptyIndex = null;
    let row = null;
    if (numberArray.flat().includes("")) {
        for (let i = 0; i < newNumberArray.length; i++) {
            row = newNumberArray[i];
            for (let j = 0; j < row.length; j++) {
                if (row[j] === '') {
                    emptyIndex = { rowIndex: i, colIndex: j };
                    break; // Stop searching after finding the first empty string
                }
            }
            if (emptyIndex) {
                break; // Stop the outer loop as well
            }
        }

        if (emptyIndex) {
            
        }
    }

    
    return (
        <div className='hundreds_box'>
            {numberArray.map((row, rowIndex) => (
                <div className='mini_line1' key={rowIndex}>
                    {row.map((value, colIndex) => {
                        const testIndex = {rowIndex: rowIndex, colIndex: colIndex}
                        const keyVal = emptyIndex &&
                        (testIndex.rowIndex === emptyIndex.rowIndex && testIndex.colIndex === emptyIndex.colIndex || testIndex.rowIndex === emptyIndex.rowIndex && testIndex.colIndex === row.length - 1 - emptyIndex.colIndex)
                            ? xResponse || guess
                            : value;
                        return (
                        <TriangleUnit key={colIndex} 
                        keyVal={keyVal}
                        correct={value !== ""}
                        column={testIndex.colIndex} />
                    )})}
                </div>
            ))}
        </div>
    )
}

export default Triangle