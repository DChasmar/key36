import React, { useCallback, useContext, useEffect, useState, createContext, useRef } from 'react';
import { AppContext } from '../../App';
import Key from './Key6';
import Spacebar from './Spacebar6';

export const Keyboard6Context = createContext();

function Keyboard6() {
    const { setGameChosen, keys0Color, setKeys0Color } = useContext(AppContext);
    const [keys0, setKeys0] = useState(["", ""]);
    const [keys1, setKeys1] = useState(["Q", "W", "", "R", "T", "Y", "", "", "", "P"]);
    const [keys2, setKeys2] = useState(["", "S", "D", "F", "G", "H", "J", "K", "L"]);
    const [keys3, setKeys3] = useState(["Z", "X", "C", "V", "B", "N", "M"]);

    const fauxKeys0 = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
    const allKeys = [keys1, keys2, keys3]

    const [correctWords, setCorrectWords] = useState([['MY', 'BY'],
    ['CRY', 'DRY', 'GYM', 'FLY', 'FRY', 'PLY', 'PRY', 'PYX', 'SHY', 'SKY', 'SLY', 'SPY', 'STY', 'TRY', 'WHY', 'WRY', 'WYN'],
    ['CYST', 'GYMP', 'HYMN', 'LYNX', 'MYTH', 'SCRY', 'SKYR', 'SPRY', 'SYNC', 'WYCH', 'WYNN'],
    ['CRYPT', 'DRYLY', 'FLYBY', 'GHYLL', 'GLYPH', 'LYMPH', 'LYNCH', 'MYRRH', 'NYMPH', 'PSYCH', 'PYGMY', 'SHYLY', 'SLYLY', 'SYLPH', 'SYNCH', 'SYNTH', 'THYMY', 'TRYST', 'WRYLY'],
    ['FLYSCH', 'GLYCYL', 'MYRRHY', 'RHYTHM', 'SPRYLY']])

    const [symbolResponse, setSymbolResponse] = useState("")

    const disableKeyPressRef = useRef(false);

    const addLetter = (key) => {
        let updatedKeys = [...keys0];
        const emptyIndex = updatedKeys.findIndex((val) => val === '');
        if (emptyIndex >= 0) {
            updatedKeys[emptyIndex] = key.toUpperCase();        
        }
        setKeys0(updatedKeys);
    }

    const removeLetter = () => {
        let updatedKeys = [...keys0];
        const emptyIndex = updatedKeys.findIndex((val) => val === '');
        if (emptyIndex > 0 && emptyIndex < 10) {
            updatedKeys[emptyIndex - 1] = '';
        } else if (emptyIndex === -1) {
            
        }
        setKeys0(updatedKeys);
    }

    const checkWord = () => {
        if (keys0.includes("")) return;
        const wordGuess = keys0.join('');
        console.log(correctWords[keys0.length - 2])
        if (correctWords[keys0.length - 2].includes(wordGuess)) {
            setSymbolResponse("check");
            disableKeyPressRef.current = true;
            setTimeout(() => {
                if (keys0.length < 6){
                    let length = keys0.length;
                    let updatedKeys0 = keys0
                    for (let i = 0; i < length; i++) {
                    updatedKeys0[i] = "";
                }
                updatedKeys0.push("");
                setKeys0(updatedKeys0);
                } else {
                    registerAndReset()
                }
                setSymbolResponse("");
                disableKeyPressRef.current = false;
            }, 1000);
        } else {
            setSymbolResponse("times");
            disableKeyPressRef.current = true;
            setTimeout(() => {
                let length = keys0.length;
                let updatedKeys0 = keys0
                for (let i = 0; i < length; i++) {
                updatedKeys0[i] = "";
                }
                setKeys0(updatedKeys0);
                setSymbolResponse("");
                disableKeyPressRef.current = false;
            }, 1000);
        }
    }

    const registerAndReset = () => {
        let newKeys0Color = keys0Color;
        newKeys0Color[5] = 1;
        setKeys0Color(newKeys0Color);
        setGameChosen({ gameChosen: false, gameNumber: '' });
    }

    useEffect(() => {
        if (keys0.length > 3 && keys0.findIndex((val) => val === '') === keys0.length - 1) {
            setKeys2(["", "", "D", "F", "G", "H", "J", "K", "L"])
        } else {
            setKeys2(["", "S", "D", "F", "G", "H", "J", "K", "L"])
        }
        checkWord()
    }, [keys0]);

    const handleKeyboard = useCallback((event) => {

        if (disableKeyPressRef.current) {
            event.preventDefault();
            return;
        } else if (event.key === "Backspace") {
            removeLetter()
        } else if (event.key === " ") {
            setGameChosen({gameChosen: false, gameNumber: ''});
        } else {
            fauxKeys0.forEach((key) => {
                if (event.key.toUpperCase() === key.toUpperCase()) {
                    removeLetter()
                }            
            });
            for (const keys of allKeys) {
              for (const key of keys) {
                if (event.key.toLowerCase() === key.toLowerCase()) {
                  addLetter(key);
                  break;
                }
              }
            }
          }
      }, [fauxKeys0, allKeys]);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyboard);

        return () => {
            document.removeEventListener("keydown", handleKeyboard);
        };
    }, [handleKeyboard]);

    return (
        <div className="keyboard" onKeyDown={handleKeyboard}>
            <Keyboard6Context.Provider
                value={{
                addLetter,
                removeLetter
                }}>
            <div className='line0'>{keys0.map((key, index) => {
                const uniqueKey = `0-${index}`;
                return <Key keyVal={key} key={uniqueKey} keyLine={0} />;
            })}</div>
            <div className='line1'>{keys1.map((key, index) => {
                const uniqueKey = `1-${index}`;
                return <Key keyVal={key} key={uniqueKey} keyLine={1} />;
            })}</div>
            <div className='line2'>
                {keys2.map((key, index) => {
                const uniqueKey = `2-${index}`;
                return <Key keyVal={key} key={uniqueKey} keyLine={2} />;})}
            </div>
            <div className='line3'>{keys3.map((key, index) => {
                const uniqueKey = `3-${index}`;
                return <Key keyVal={key} key={uniqueKey} keyLine={3} />;
                })}
            </div>
            <div className='line4'>< Spacebar keyVal={symbolResponse} /></div>
            </Keyboard6Context.Provider>
        </div>
    )

}

export default Keyboard6