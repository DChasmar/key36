import React, { useCallback, useContext, useEffect, useState, createContext } from 'react';
import { AppContext } from '../../App';
import Key from './KeyQ';
import Spacebar from './SpacebarQ';

export const KeyboardQContext = createContext();

function KeyboardQ() {
    const { setGameChosen, keysColor, setKeysColor } = useContext(AppContext);
    const [keys0, setKeys0] = useState(["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]);
    const [keys1, setKeys1] = useState(["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]);
    const [keys2, setKeys2] = useState(["A", "S", "D", "F", "G", "H", "J", "K", "L"]);
    const [keys3, setKeys3] = useState(["Z", "X", "C", "V", "B", "N", "M"]);
    const allKeys = [keys0, keys1, keys2, keys3]

    const [keys0Blue, setKeys0Blue] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [keys1Blue, setKeys1Blue] = useState([0, 0, 0, -1, 0, 0, -1, 0, 0, 0]);
    const [keys2Blue, setKeys2Blue] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [keys3Blue, setKeys3Blue] = useState([0, 0, 0, 0, 0, -1, 0]);
    
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [symbolResponse, setSymbolResponse] = useState("")

    // Define the keyboard layout as a dictionary
    const keyTouchDictionary = {
        '1': ['2', 'Q'],
        '2': ['1', 'W', '3'],
        '3': ['2', 'E', '4'],
        '4': ['3', 'R', '5'],
        '5': ['4', 'T', '6'],
        '6': ['5', 'Y', '7'],
        '7': ['6', 'U', '8'],
        '8': ['7', 'I', '9'],
        '9': ['8', 'O', '0'],
        '0': ['9', 'P'],
        'Q': ['1', 'W', 'A'],
        'W': ['2','Q', 'A', 'S', 'E'],
        'E': ['3', 'W', 'S', 'D', 'R'],
        'R': ['4', 'E', 'D', 'F', 'T'],
        'T': ['5', 'R', 'F', 'G', 'Y'],
        'Y': ['6', 'T', 'G', 'H', 'U'],
        'U': ['7', 'Y', 'H', 'J', 'I'],
        'I': ['8', 'U', 'J', 'K', 'O'],
        'O': ['9', 'I', 'L', 'P'],
        'P': ['0', 'O', 'L'],
        'A': ['Q', 'W', 'S'],
        'S': ['W', 'E', 'A', 'Z', 'D'],
        'D': ['E', 'R', 'S', 'X', 'F'],
        'F': ['R', 'T', 'D', 'C', 'G'],
        'G': ['T', 'Y', 'F', 'V', 'H'],
        'H': ['Y', 'U', 'G', 'B', 'J'],
        'J': ['U', 'I', 'H', 'N', 'K'],
        'K': ['I', 'O', 'J', 'M', 'L'],
        'L': ['O', 'P', 'K',],
        'Z': ['S', 'X'],
        'X': ['D', 'Z', 'C'],
        'C': ['F', 'X', 'V'],
        'V': ['G', 'C', 'B'],
        'B': ['H', 'V', 'N'],
        'N': ['J', 'B', 'M'],
        'M': ['K', 'N']
    };

    const checkGameOver = () => {
      const isOneExists = keys0Blue.includes(0) || keys1Blue.includes(0) || keys2Blue.includes(0) || keys3Blue.includes(0);
      if (!isOneExists) {
        setSymbolResponse("check");
        setTimeout(() => {
          let newKeysColor = [...keysColor];
          newKeysColor[1][0] = 1;
          setKeysColor(newKeysColor);
          setGameChosen({ gameChosen: false, gameNumber: '' });
        }, 1000);
      }
    }

    const goodPick = (key) => {
      const lastValue = selectedKeys[selectedKeys.length - 1];
      const touchValues = keyTouchDictionary[key] || [];
      return touchValues.includes(lastValue);
    }

    const seeBlue = () => {
      const blueArrays = [keys0Blue, keys1Blue, keys2Blue, keys3Blue];
    
      for (const val of selectedKeys) {
        const valIndex0 = keys0.indexOf(val);
        const valIndex1 = keys1.indexOf(val);
        const valIndex2 = keys2.indexOf(val);
        const valIndex3 = keys3.indexOf(val);
    
        if (valIndex0 !== -1) {
          blueArrays[0][valIndex0] = 1;
        }
        if (valIndex1 !== -1) {
          blueArrays[1][valIndex1] = 1;
        }
        if (valIndex2 !== -1) {
          blueArrays[2][valIndex2] = 1;
        }
        if (valIndex3 !== -1) {
          blueArrays[3][valIndex3] = 1;
        }
      }
    
      setKeys0Blue([...keys0Blue]);
      setKeys1Blue([...keys1Blue]);
      setKeys2Blue([...keys2Blue]);
      setKeys3Blue([...keys3Blue]);
    };

    const selectKey = (key) => {
      if (selectedKeys.length === 0) {
        setSelectedKeys([key]);
      } else {
        if (selectedKeys.includes(key)) {
          return;
        } else if (goodPick(key)) {
          let newSelectedKeys = [...selectedKeys];
          newSelectedKeys.push(key);
          setSelectedKeys(newSelectedKeys);
        } else {
          setKeys0Blue([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
          setKeys1Blue([0, 0, 0, -1, 0, 0, -1, 0, 0, 0]);
          setKeys2Blue([0, 0, 0, 0, 0, 0, 0, 0, 0]);
          setKeys3Blue([0, 0, 0, 0, 0, -1, 0]);
          setSelectedKeys([key]);
        }
      }
    };

    useEffect(() => {
      seeBlue()
    }, [selectedKeys]);

    useEffect(() => {
      checkGameOver();
    }, [keys0Blue, keys1Blue, keys2Blue, keys3Blue]);

    const handleKeyboard = useCallback((event) => {
        if(event.key === "Backspace") {

        } else if (event.key === " ") {
            setGameChosen({gameChosen: false, gameNumber: ''});
        } else {
            for (const keys of allKeys) {
                for (const key of keys) {
                  const disallowedKeys = ["r", "u", "n"]
                  if (disallowedKeys.includes(event.key.toLowerCase())) return;
                  if (event.key.toLowerCase() === key.toLowerCase()) {
                    selectKey(key);
                    break;
                  }
                }
              }
            }
    }, [allKeys]);

    useEffect(() => {
        const handleKeyDown = (event) => {
          handleKeyboard(event);
        };
      
        document.addEventListener("keydown", handleKeyDown);
      
        return () => {
          document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyboard]);

    return (
        <div className="keyboard" onKeyDown={handleKeyboard}>
            <KeyboardQContext.Provider
                value={{
                selectKey}}>
            <div className='line0'>{keys0.map((key, index) => {
                const uniqueKey = `0-${index}`;
                return <Key keyVal={key}
                  key={uniqueKey}
                  blue={keys0Blue[index] === 1} />;
            })}</div>
            <div className='line1'>
                {keys1.map((key, index) => {
                const uniqueKey = `1-${index}`;
                const isRun = index === 3 || index === 6;
                return <Key keyVal={key}
                  key={uniqueKey}
                  run = {isRun ? true : undefined}
                  blue={keys1Blue[index] === 1} />;
            })}</div>
            <div className='line2'>
                {keys2.map((key, index) => {
                const uniqueKey = `2-${index}`;
                return <Key keyVal={key} 
                key={uniqueKey}
                blue={keys2Blue[index] === 1} />;})}
            </div>
            <div className='line3'>{keys3.map((key, index) => {
                const uniqueKey = `3-${index}`;
                const isRun = index === 5;
                return <Key keyVal={key}
                key={uniqueKey}
                run = {isRun ? true : undefined}
                blue={keys3Blue[index] === 1} />;
                })}
            </div>
            <div className='line4'>< Spacebar keyVal={symbolResponse} /></div>
            </KeyboardQContext.Provider>
        </div>
    )

}

export default KeyboardQ