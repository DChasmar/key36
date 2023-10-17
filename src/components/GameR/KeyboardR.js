import React, { useCallback, useContext, useEffect, useState, createContext } from 'react';
import { AppContext } from '../../App';
import { useKeydownEffect } from '../../utils';
import Key from './KeyR';
import Spacebar from './SpacebarR';

export const KeyboardRContext = createContext();

function KeyboardR() {
    const { setGameChosen, keysColor, setKeysColor } = useContext(AppContext);
    const [keys0, setKeys0] = useState(["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]);
    const [keys1, setKeys1] = useState(["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]);
    const [keys2, setKeys2] = useState(["A", "S", "D", "F", "G", "H", "J", "K", "L"]);
    const [keys3, setKeys3] = useState(["Z", "X", "C", "V", "B", "N", "M"]);
    const allKeys = [keys0, keys1, keys2, keys3]

    const [keys0Red, setKeys0Red] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [keys1Red, setKeys1Red] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [keys2Red, setKeys2Red] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [keys3Red, setKeys3Red] = useState([0, 0, 0, 0, 0, 0, 0]);

    const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", 
                    "J", "K", "L", "M", "N", "O", "P", "Q", "R", 
                    "S", "T", "U", "V", "W", "X", "Y", "Z"];
    
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [response, setResponse] = useState("")

    const checkGameOver = () => {
      const isOneExists = keys0Red.includes(0) || keys1Red.includes(0) || keys2Red.includes(0) || keys3Red.includes(0);
      if (!isOneExists) {
        setResponse("check");
        setTimeout(() => {
          let newKeysColor = [...keysColor];
          newKeysColor[1][3] = 1;
          setKeysColor(newKeysColor);
          setGameChosen({ gameChosen: false, gameNumber: '' });
        }, 1000);
      }
      }

    const seeRedNumbers = () => {
      let updatedKeys0Red = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      keys0.forEach((key, index) => {
        const numberCode = digits.indexOf(key);
        if (index === 0) {
          const nextKey = keys0[index + 1];
          const nextNumberCode = digits.indexOf(nextKey);

          if (numberCode + nextNumberCode === 9) {
            updatedKeys0Red[index] = 1;
          }
        } else if (index === keys0.length - 1) {
          const prevKey = keys0[index - 1];
          const prevNumberCode = digits.indexOf(prevKey);
          
          if (numberCode + prevNumberCode === 9) {
            updatedKeys0Red[index] = 1;
          }
        } else if(index > 0 && index < keys0.length - 1) {
          const prevKey = keys0[index - 1];
          const nextKey = keys0[index + 1];
          const prevNumberCode = digits.indexOf(prevKey);
          const nextNumberCode = digits.indexOf(nextKey);
          
          if (numberCode + nextNumberCode === 9 || numberCode + prevNumberCode === 9) {
            updatedKeys0Red[index] = 1;
          }
        }
        
      });
      setKeys0Red(updatedKeys0Red)
    }

    const seeRedLetters = () => {
      let updatedKeys1Red = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      let updatedKeys2Red = [0, 0, 0, 0, 0, 0, 0, 0, 0]
      let updatedKeys3Red = [0, 0, 0, 0, 0, 0, 0]
      keys1.forEach((key, index) => {
        const numberCode = letters.indexOf(key);
        if (index === 0) {
          const nextKey = keys1[index + 1];
          const nextLetterCode = letters.indexOf(nextKey);
          const downRightKey = keys2[index];
          const downRightLetterCode = letters.indexOf(downRightKey);

          if (numberCode + nextLetterCode === 25 || numberCode + downRightLetterCode === 25) {
            updatedKeys1Red[index] = 1;
          }
        } else if (index === keys1.length - 1) {
          const prevKey = keys1[index - 1];
          const prevLetterCode = letters.indexOf(prevKey);
          const downLeftKey = keys2[index - 1];
          const downLeftLetterCode = letters.indexOf(downLeftKey);
          
          if (numberCode + prevLetterCode === 25 || numberCode + downLeftLetterCode === 25) {
            updatedKeys1Red[index] = 1;
          }
        } else if(index > 0 && index < keys1.length - 1) {
          const prevKey = keys1[index - 1];
          const nextKey = keys1[index + 1];
          const prevLetterCode = letters.indexOf(prevKey);
          const nextLetterCode = letters.indexOf(nextKey);
          const downLeftKey = keys2[index - 1];
          const downLeftLetterCode = letters.indexOf(downLeftKey);
          const downRightKey = keys2[index];
          const downRightLetterCode = letters.indexOf(downRightKey);
          
          if (numberCode + prevLetterCode === 25 || numberCode + nextLetterCode === 25
           || numberCode + downLeftLetterCode === 25 || numberCode + downRightLetterCode === 25) {
            updatedKeys1Red[index] = 1;
          }
        }
      });
      keys2.forEach((key, index) => {
        const numberCode = letters.indexOf(key);
        if (index === 0) {
          const nextKey = keys2[index + 1];
          const nextLetterCode = letters.indexOf(nextKey);
          const upLeftKey = keys1[index];
          const upLeftLetterCode = letters.indexOf(upLeftKey);
          const upRightKey = keys1[index + 1];
          const upRightLetterCode = letters.indexOf(upRightKey);

          if (numberCode + nextLetterCode === 25 || numberCode + upLeftLetterCode === 25
           || numberCode + upRightLetterCode === 25) {
            updatedKeys2Red[index] = 1;
          }
        } else if (index === keys2.length - 1) {
          const prevKey = keys2[index - 1];
          const prevLetterCode = letters.indexOf(prevKey);
          const upLeftKey = keys1[index];
          const upLeftLetterCode = letters.indexOf(upLeftKey);
          const upRightKey = keys1[index + 1];
          const upRightLetterCode = letters.indexOf(upRightKey);
          
          if (numberCode + prevLetterCode === 25 || numberCode + upLeftLetterCode === 25
          || numberCode + upRightLetterCode === 25) {
            updatedKeys2Red[index] = 1;
          }
        } else if(index > 0 && index < keys2.length - 1) {
          const prevKey = keys2[index - 1];
          const nextKey = keys2[index + 1];
          const prevLetterCode = letters.indexOf(prevKey);
          const nextLetterCode = letters.indexOf(nextKey);
          const downKey = keys3[index - 1];
          const downLetterCode = letters.indexOf(downKey);
          const upLeftKey = keys1[index];
          const upLeftLetterCode = letters.indexOf(upLeftKey);
          const upRightKey = keys1[index + 1];
          const upRightLetterCode = letters.indexOf(upRightKey);
          
          if (numberCode + prevLetterCode === 25 || numberCode + nextLetterCode === 25
           || numberCode + downLetterCode === 25 || numberCode + upLeftLetterCode === 25
           || numberCode + upRightLetterCode === 25) {
            updatedKeys2Red[index] = 1;
          }
        }
      });
      keys3.forEach((key, index) => {
        const numberCode = letters.indexOf(key);
        const upKey = keys2[index + 1];
        const upLetterCode = letters.indexOf(upKey);
        if (index === 0) {
          const nextKey = keys3[index + 1];
          const nextLetterCode = letters.indexOf(nextKey);

          if (numberCode + nextLetterCode === 25 || numberCode + upLetterCode === 25) {
            updatedKeys3Red[index] = 1;
          }
        } else if (index === keys3.length - 1) {
          const prevKey = keys3[index - 1];
          const prevLetterCode = letters.indexOf(prevKey);
          
          if (numberCode + prevLetterCode === 25 || numberCode + upLetterCode === 25) {
            updatedKeys3Red[index] = 1;
          }
        } else if(index > 0 && index < keys3.length - 1) {
          const prevKey = keys3[index - 1];
          const nextKey = keys3[index + 1];
          const prevLetterCode = letters.indexOf(prevKey);
          const nextLetterCode = letters.indexOf(nextKey);
          
          if (numberCode + prevLetterCode === 25 || numberCode + nextLetterCode === 25
           || numberCode + upLetterCode === 25) {
            updatedKeys3Red[index] = 1;
          }
        }
      });
      setKeys1Red(updatedKeys1Red)
      setKeys2Red(updatedKeys2Red)
      setKeys3Red(updatedKeys3Red)
    }

    const selectKey = (key) => {
      if (selectedKeys.length === 0) {
        setSelectedKeys([key]);
      } else if (selectedKeys.length === 1) {
        const [firstKey] = selectedKeys;
        
        if (/^[0-9]$/.test(firstKey) && /^[0-9]$/.test(key)) {
          // Swap keys within keys0 array
          if (keys0.includes(firstKey) && keys0.includes(key)) {
            const updatedKeys0 = keys0.map((k) => {
              if (k === firstKey) return key;
              if (k === key) return firstKey;
              return k;
            });
            setKeys0(updatedKeys0);
            setSelectedKeys([]);
          }
        } else if (/^[A-Za-z]$/.test(firstKey) && /^[A-Za-z]$/.test(key)) {
          // Find arrays that contain both firstKey and key
          const arrays = [keys1, keys2, keys3];
          const arraysContainingKeys = arrays.filter((keys) => keys.includes(firstKey) || keys.includes(key));

          // Swap values in the repetitive arrays
          for (const keys of arraysContainingKeys) {
            const updatedKeys = keys.map((k) => {
              if (k === firstKey) return key;
              if (k === key) return firstKey;
              return k;
            });

            // Update the state with the swapped values
            if (keys === keys1) {
              setKeys1(updatedKeys);
            } else if (keys === keys2) {
              setKeys2(updatedKeys);
            } else if (keys === keys3) {
              setKeys3(updatedKeys);
            }
          }
          setSelectedKeys([]);
        } else {
          setSelectedKeys([key])
        }
      }
    };

    useEffect(() => {
      seeRedNumbers();
      seeRedLetters();
    }, [selectedKeys]);

    useEffect(() => {
      checkGameOver();
    }, [keys0Red, keys1Red, keys2Red, keys3Red]);

    const handleKeyboard = useCallback((event) => {
        if(event.key === "Backspace") {

        } else if (event.key === " ") {
            setGameChosen({gameChosen: false, gameNumber: ''});
        } else {
            for (const keys of allKeys) {
                for (const key of keys) {
                  if (event.key.toLowerCase() === key.toLowerCase()) {
                    selectKey(key);
                    break;
                  }
                }
              }
            }
    }, [allKeys]);

    useKeydownEffect(handleKeyboard, [handleKeyboard]);

    return (
        <div className="keyboard" onKeyDown={handleKeyboard}>
            <KeyboardRContext.Provider
                value={{
                selectKey}}>
            <div className='line0'>{keys0.map((key, index) => {
                const uniqueKey = `0-${index}`;
                return <Key keyVal={key}
                  key={uniqueKey}
                  red={keys0Red[index] === 0}
                  style={selectedKeys[0] === key ? { color: 'yellow' } : {}} />;
            })}</div>
            <div className='line1'>
                {keys1.map((key, index) => {
                const uniqueKey = `1-${index}`;
                return <Key keyVal={key}
                  key={uniqueKey}
                  red={keys1Red[index] === 0}
                  style={selectedKeys[0] === key ? { color: 'yellow' } : {}} />;
            })}</div>
            <div className='line2'>
              {keys2.map((key, index) => {
              const uniqueKey = `2-${index}`;
              return <Key keyVal={key} 
              key={uniqueKey}
              red={keys2Red[index] === 0}
              style={selectedKeys[0] === key ? { color: 'yellow' } : {}} />;})}
            </div>
            <div className='line3'>{keys3.map((key, index) => {
              const uniqueKey = `3-${index}`;
                return <Key keyVal={key}
                  key={uniqueKey}
                  red={keys3Red[index] === 0}
                  style={selectedKeys[0] === key ? { color: 'yellow' } : {}} />;
                })}
            </div>
            <div className='line4'>< Spacebar keyVal={response} /></div>
            </KeyboardRContext.Provider>
        </div>
    )

}

export default KeyboardR