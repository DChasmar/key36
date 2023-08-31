import React, { useCallback, useContext, useEffect, useState, createContext, useRef } from 'react';
import { AppContext } from '../../App';
import Key from './Key9';
import Spacebar from './Spacebar9';

export const Keyboard9Context = createContext();

function Keyboard9() {
    const { setGameChosen, keysColor, setKeysColor } = useContext(AppContext);
    const [keys0, setKeys0] = useState([""]);
    const [keys1, setKeys1] = useState(["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]);
    const [keys2, setKeys2] = useState(["A", "S", "D", "F", "G", "H", "J", "K", "L"]);
    const [keys3, setKeys3] = useState(["Z", "X", "C", "V", "B", "N", "M"]);

    const fauxKeys0 = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
    const fauxKeys1 = ["Q", "W", "E", "R", "T", "T", "R", "E", "W", "Q"]
    const fauxKeys2 = ["A", "S", "D", "F", "G", "F", "D", "S", "A"]
    const fauxKeys3 = ["Z", "X", "C", "V", "C", "X", "Z"]
    const allKeys = [keys1, keys2, keys3]

    const [wordList, setWordList] = useState([])

    const [correctWords, setCorrectWords] = useState([
        ['A', 'I'], 
        [ "AHA", "BIB", "BOB", "BUB", "DAD", "DID", "DUD", "EKE", "ERE", "EVE",
        "EWE", "EYE", "GAG", "GIG", "HAH", "HUH", "MAM", "MOM", "MUM", "NAN",
        "NUN", "PAP", "PEP", "PIP", "POP", "PUP", "SIS", "TAT", "TIT", "TOT", "TUT", "WOW"],
        ["BOOB", "DEED", "KOOK", "NAAN", "NOON", "PEEP", "POOP", "SEES", "TOOT"],
        ["CIVIC", "KAYAK", "LEVEL", "MADAM", "MINIM", "RADAR", "REFER", "ROTOR",
        "SAGAS", "SEXES", "SOLOS", "STATS", "TENET"],
        ["REDDER", "DENNED", "PULLUP", "SUCCUS"],
        ["DEIFIED", "RACECAR", "ROTATOR", "REPAPER", "REVIVER"]
    ]);


    const [symbolResponse, setSymbolResponse] = useState("")

    const disableKeyPressRef = useRef(false);

    const gameOver = () => {
        let newKeysColor = [...keysColor];
        newKeysColor[0][8] = 1;
        setKeysColor(newKeysColor);
        setGameChosen({ gameChosen: false, gameNumber: '' });
    }

    const goodWord = () => {
        setSymbolResponse("check");
        disableKeyPressRef.current = true;
        let newWordList = [...wordList];
        newWordList.push(keys0.join(''));
        setWordList(newWordList);
        setTimeout(() => {
            if (keys0.length < 7){
                let length = keys0.length;
                if (length === 1) {
                    length = 2;
                }
                let updatedKeys0 = keys0
                for (let i = 0; i < length; i++) {
                updatedKeys0[i] = "";
                }
                updatedKeys0.push("");
                setKeys0(updatedKeys0);
            } else {
                gameOver()
            }
            setSymbolResponse("");
            disableKeyPressRef.current = false;
        }, 1000);
    }

    const badWord = () => {
        setSymbolResponse("times");
        disableKeyPressRef.current = true;
        if (keys0.length !== 1) {
            setKeys1(fauxKeys1)
            setKeys2(fauxKeys2)
            setKeys3(fauxKeys3)
        }
        setTimeout(() => {
            let length = keys0.length;
            let updatedKeys0 = keys0
            for (let i = 0; i < length; i++) {
            updatedKeys0[i] = "";
            }
            setKeys0(updatedKeys0);
            setSymbolResponse("");
            if (keys0.length !== 1) {
                setKeys1(["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"])
                setKeys2(["A", "S", "D", "F", "G", "H", "J", "K", "L"])
                setKeys3(["Z", "X", "C", "V", "B", "N", "M"])
            }
            disableKeyPressRef.current = false;
        }, 1000);
    }
    
    const addLetter = (key) => {
        let updatedKeys = [...keys0];
        const emptyIndex = updatedKeys.findIndex((val) => val === '');
        if (emptyIndex >= 0) {
            updatedKeys[emptyIndex] = key.toUpperCase(); 
            updatedKeys[updatedKeys.length - (emptyIndex + 1)] = key.toUpperCase();        
        }
        setKeys0(updatedKeys);
    }

    const removeLetter = () => {
        let updatedKeys = [...keys0];
        const emptyIndex = updatedKeys.findIndex((val) => val === '');
        if (emptyIndex > 0 && emptyIndex < 10) {
            updatedKeys[emptyIndex - 1] = '';
            updatedKeys[updatedKeys.length - emptyIndex] = ''; 
        }
        setKeys0(updatedKeys);
    }

    const checkWord = () => {
        if (keys0.includes("")) return;
        if (keys0.length === 1) {
            if (keys0[0] === "A" || keys0[0] === "I") {
                goodWord()
            } else {
                badWord()
            }
        } else {
            const wordGuess = keys0.join('');
            if (correctWords[keys0.length - 2].includes(wordGuess)) {
                goodWord()
            } else {
                badWord()
            }
        }
    }

    useEffect(() => {
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
            <Keyboard9Context.Provider
                value={{
                addLetter,
                removeLetter
                }}>
            <div className='line0'>{keys0.map((key, index) => {
                const uniqueKey = `0-${index}`;
                return <Key keyVal={key} key={uniqueKey} keyLine={0} guessKey />;
            })}</div>
            <div className='line1'>{keys1.map((key, index) => {
                const uniqueKey = `1-${index}`;
                return <Key keyVal={key} key={uniqueKey} keyLine={1} />;
            })}</div>
            <div className='line2'>
                {keys2.map((key, index) => {
                const uniqueKey = `2-${index}`;
                return <Key keyVal={key} key={uniqueKey} keyLine={2} />;
            })}</div>
            <div className='line3'>{keys3.map((key, index) => {
                const uniqueKey = `3-${index}`;
                return <Key keyVal={key} key={uniqueKey} keyLine={3} />;
            })}</div>
            <div className='line4'>< Spacebar keyVal={symbolResponse} /></div>
            <div className='word_box'>
                {wordList.map((word, index) => (
                    <p key={index} className="word_box_word" >{word}</p>
            ))}</div>
            </Keyboard9Context.Provider>
        </div>
    )

}

export default Keyboard9