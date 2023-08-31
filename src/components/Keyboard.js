import React, { useCallback, useContext, useEffect, createContext} from 'react';
import { AppContext } from '../App';
import Key from './Key';

export const KeyboardContext = createContext();

function Keyboard() {
    const { chooseGame, keysColor } = useContext(AppContext);
    const keys0 = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
    const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
    const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];
    const allKeys = [keys0, keys1, keys2, keys3]
    
    const handleKeyboard = useCallback((event) => {
        for (const keys of allKeys) {
            for (const key of keys) {
              if (event.key.toLowerCase() === key.toLowerCase()) {
                chooseGame(key);
                break;
              }
            }
          }
        }, [chooseGame, allKeys]);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyboard);

        return () => {
            document.removeEventListener("keydown", handleKeyboard);
        };
    }, [handleKeyboard]);

    return (
        <div className="keyboard" onKeyDown={handleKeyboard}>
            <div className='line0'>{keys0.map((key, index) => {
                const uniqueKey = `0-${index}`;
                return <Key keyVal={key} key={uniqueKey} blue={keysColor[0][index] === 1} />;
            })}</div>
            <div className='line1'>{keys1.map((key, index) => {
                const uniqueKey = `1-${index}`;
                return <Key keyVal={key} key={uniqueKey} blue={keysColor[1][index] === 1} />;
            })}</div>
            <div className='line2'>{keys2.map((key, index) => {
                const uniqueKey = `2-${index}`;
                return <Key keyVal={key} key={uniqueKey} blue={keysColor[2][index] === 1} />;
            })}</div>
            <div className='line3'>{keys3.map((key, index) => {
                const uniqueKey = `3-${index}`;
                return <Key keyVal={key} key={uniqueKey} blue={keysColor[3][index] === 1} />;
                })}
            </div>
        </div>
    )

}

export default Keyboard