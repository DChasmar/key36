import React, { useCallback, useContext, useEffect, useState, createContext } from 'react';
import { AppContext } from '../../App';
import Key from './Key3';
import Spacebar from './Spacebar3';

export const Keyboard3Context = createContext();

function Keyboard3() {
    const { setGameChosen, keys0Color, setKeys0Color } = useContext(AppContext);
    const [keys0, setKeys0] = useState(["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]);
    const [keys1, setKeys1] = useState(["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]);
    const [keys2, setKeys2] = useState(["A", "S", "D", "F", "G", "H", "J", "K", "L"]);
    const [keys3, setKeys3] = useState(["Z", "X", "C", "V", "B", "N", "M"]);
    const allKeys = [keys0, keys1, keys2, keys3]

    const [keys0Red, setKeys0Red] = useState([1, 1, 1, 1, 1, 1, 1, 1, 1, 0]);
    const [keys1Red, setKeys1Red] = useState([0, 0, 1, 0, 0, 0, 0, 1, 1, 1]);
    const [keys2Red, setKeys2Red] = useState([0, 0, 1, 1, 1, 1, 1, 1, 1]);
    const [keys3Red, setKeys3Red] = useState([0, 0, 0, 0, 0, 1, 1]);
    
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [symbolResponse, setSymbolResponse] = useState("")

    const checkGameOver = () => {
      const isOneExists = keys0Red.includes(1) || keys1Red.includes(1) || keys2Red.includes(1) || keys3Red.includes(1);
      if (!isOneExists) {
        setSymbolResponse("check");
        setTimeout(() => {
          let newKeys0Color = keys0Color;
          newKeys0Color[2] = 1;
          setKeys0Color(newKeys0Color)
          setGameChosen({ gameChosen: false, gameNumber: '' });
        }, 1000);
        }
      }

    const seeRedNumbers = () => {
      let updatedKeys0Red = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      keys0.forEach((key, index) => {
        const numberCode = key.charCodeAt(0);
        if (index === 0) {
          const nextKey = keys0[index + 1];
          const nextNumberCode = nextKey.charCodeAt(0);

          if (Math.abs(numberCode - nextNumberCode) === 1) {
            updatedKeys0Red[index] = 1;
          }
        } else if (index === keys0.length - 1) {
          const prevKey = keys0[index - 1];
          const prevNumberCode = prevKey.charCodeAt(0);
          
          if (Math.abs(numberCode - prevNumberCode) === 1) {
            updatedKeys0Red[index] = 1;
          }
        } else if(index > 0 && index < keys0.length - 1) {
          const prevKey = keys0[index - 1];
          const nextKey = keys0[index + 1];
          const prevNumberCode = prevKey.charCodeAt(0);
          const nextNumberCode = nextKey.charCodeAt(0);
          
          if (Math.abs(numberCode - prevNumberCode) === 1 || Math.abs(numberCode - nextNumberCode) === 1) {
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
        const numberCode = key.charCodeAt(0);
        if (index === 0) {
          const nextKey = keys1[index + 1];
          const nextLetterCode = nextKey.charCodeAt(0);
          const downRightKey = keys2[index];
          const downRightLetterCode = downRightKey.charCodeAt(0);

          if (Math.abs(numberCode - nextLetterCode) === 1 || Math.abs(numberCode - downRightLetterCode) === 1) {
            updatedKeys1Red[index] = 1;
          }
        } else if (index === keys1.length - 1) {
          const prevKey = keys1[index - 1];
          const prevNumberCode = prevKey.charCodeAt(0);
          const downLeftKey = keys2[index - 1];
          const downLeftLetterCode = downLeftKey.charCodeAt(0);
          
          if (Math.abs(numberCode - prevNumberCode) === 1 || Math.abs(numberCode - downLeftLetterCode) === 1) {
            updatedKeys1Red[index] = 1;
          }
        } else if(index > 0 && index < keys1.length - 1) {
          const prevKey = keys1[index - 1];
          const nextKey = keys1[index + 1];
          const prevNumberCode = prevKey.charCodeAt(0);
          const nextNumberCode = nextKey.charCodeAt(0);
          const downLeftKey = keys2[index - 1];
          const downLeftLetterCode = downLeftKey.charCodeAt(0);
          const downRightKey = keys2[index];
          const downRightLetterCode = downRightKey.charCodeAt(0);
          
          if (Math.abs(numberCode - prevNumberCode) === 1 || Math.abs(numberCode - nextNumberCode) === 1
           || Math.abs(numberCode - downLeftLetterCode === 1 || Math.abs(numberCode - downRightLetterCode) === 1)) {
            updatedKeys1Red[index] = 1;
          }
        }
      });
      keys2.forEach((key, index) => {
        const numberCode = key.charCodeAt(0);
        if (index === 0) {
          const nextKey = keys2[index + 1];
          const nextLetterCode = nextKey.charCodeAt(0);
          const upLeftKey = keys1[index];
          const upLeftLetterCode = upLeftKey.charCodeAt(0);
          const upRightKey = keys1[index + 1];
          const upRightLetterCode = upRightKey.charCodeAt(0);

          if (Math.abs(numberCode - nextLetterCode) === 1 || Math.abs(numberCode - upLeftLetterCode) === 1
           || Math.abs(numberCode - upRightLetterCode) === 1) {
            updatedKeys2Red[index] = 1;
          }
        } else if (index === keys2.length - 1) {
          const prevKey = keys2[index - 1];
          const prevNumberCode = prevKey.charCodeAt(0);
          const upLeftKey = keys1[index];
          const upLeftLetterCode = upLeftKey.charCodeAt(0);
          const upRightKey = keys1[index + 1];
          const upRightLetterCode = upRightKey.charCodeAt(0);
          
          if (Math.abs(numberCode - prevNumberCode) === 1 || Math.abs(numberCode - upLeftLetterCode) === 1
          || Math.abs(numberCode - upRightLetterCode) === 1) {
            updatedKeys2Red[index] = 1;
          }
        } else if(index > 0 && index < keys2.length - 1) {
          const prevKey = keys2[index - 1];
          const nextKey = keys2[index + 1];
          const prevNumberCode = prevKey.charCodeAt(0);
          const nextNumberCode = nextKey.charCodeAt(0);
          const downKey = keys3[index - 1];
          const downLetterCode = downKey.charCodeAt(0);
          const upLeftKey = keys1[index];
          const upLeftLetterCode = upLeftKey.charCodeAt(0);
          const upRightKey = keys1[index + 1];
          const upRightLetterCode = upRightKey.charCodeAt(0);
          
          if (Math.abs(numberCode - prevNumberCode) === 1 || Math.abs(numberCode - nextNumberCode) === 1
           || Math.abs(numberCode - downLetterCode) === 1 || Math.abs(numberCode - upLeftLetterCode) === 1
           || Math.abs(numberCode - upRightLetterCode) === 1) {
            updatedKeys2Red[index] = 1;
          }
        }
      });
      keys3.forEach((key, index) => {
        const numberCode = key.charCodeAt(0);
        const upKey = keys2[index + 1];
        const upLetterCode = upKey.charCodeAt(0);
        if (index === 0) {
          const nextKey = keys3[index + 1];
          const nextLetterCode = nextKey.charCodeAt(0);

          if (Math.abs(numberCode - nextLetterCode) === 1 || Math.abs(numberCode - upLetterCode) === 1) {
            updatedKeys3Red[index] = 1;
          }
        } else if (index === keys3.length - 1) {
          const prevKey = keys3[index - 1];
          const prevNumberCode = prevKey.charCodeAt(0);
          
          if (Math.abs(numberCode - prevNumberCode) === 1 || Math.abs(numberCode - upLetterCode) === 1) {
            updatedKeys3Red[index] = 1;
          }
        } else if(index > 0 && index < keys3.length - 1) {
          const prevKey = keys3[index - 1];
          const nextKey = keys3[index + 1];
          const prevNumberCode = prevKey.charCodeAt(0);
          const nextNumberCode = nextKey.charCodeAt(0);
          
          if (Math.abs(numberCode - prevNumberCode) === 1 || Math.abs(numberCode - nextNumberCode) === 1
           || Math.abs(numberCode - upLetterCode) === 1) {
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
            <Keyboard3Context.Provider
                value={{
                selectKey}}>
            <div className='line0'>{keys0.map((key, index) => {
                const uniqueKey = `0-${index}`;
                return <Key keyVal={key}
                  key={uniqueKey}
                  red={keys0Red[index] === 1}
                  style={selectedKeys[0] === key ? { border: '3px solid #444444' } : {}} />;
            })}</div>
            <div className='line1'>
                {keys1.map((key, index) => {
                const uniqueKey = `1-${index}`;
                return <Key keyVal={key}
                  key={uniqueKey}
                  red={keys1Red[index] === 1}
                  style={selectedKeys[0] === key ? { border: '3px solid #444444' } : {}} />;
            })}</div>
            <div className='line2'>
              {keys2.map((key, index) => {
              const uniqueKey = `2-${index}`;
              return <Key keyVal={key} 
              key={uniqueKey}
              red={keys2Red[index] === 1}
              style={selectedKeys[0] === key ? { border: '3px solid #444444' } : {}} />;})}
            </div>
            <div className='line3'>{keys3.map((key, index) => {
              const uniqueKey = `3-${index}`;
                return <Key keyVal={key}
                  key={uniqueKey}
                  red={keys3Red[index] === 1}
                  style={selectedKeys[0] === key ? { border: '3px solid #444444' } : {}} />;
                })}
            </div>
            <div className='line4'>< Spacebar keyVal={symbolResponse} /></div>
            </Keyboard3Context.Provider>
        </div>
    )

}

export default Keyboard3