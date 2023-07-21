import React, { useCallback, useContext, useEffect, useState, createContext, useRef } from 'react';
import { AppContext } from '../../App';
import Key from './KeyU';
import Spacebar from './SpacebarU';

export const KeyboardUContext = createContext();

function KeyboardU() {
    const { setGameChosen, keys1Color, setKeys1Color } = useContext(AppContext);
    const [keys0, setKeys0] = useState(["1", "2", "3", "4", "5", "6", "7", "8", "9"]);
    const [keys1, setKeys1] = useState(["", "", "x", "", "=", "", ""]);
    const [keys2, setKeys2] = useState(["", "x", "", "=", "", ""]);

    const numbersArray = [
        "X", "2", "3", "22", "5", "23", "7", "222", "33", "25",
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

    const primeArray = [
        "X", "2", "3", "22", "5", "23", "7", "222", "33", "25",
        "11",'223', '13', '27', '35', '2222', '17', '233', '19', '225', 
        '37', '211', '23', '2223', '55', '213', '333', '227', '29', '235', 
        '31', '22222', '311', '217', '57', '2233', '37', '219', '313', '2225', 
        '41', '237', '43', '2211', '335', '223', '47', '22223', '77', '255', 
        '317', '2213', '53', '2333', '511', '2227', '319', '229', '59', '2235', 
        '61', '231', '337', '222222', '513', '2311', '67', '2217', '323', '257', 
        '71', '22233', '73', '237', '355', '2219', '711', '2313', '79', '22225', 
        '3333', '241', '83', '2237', '517', '243', '329', '22211', '89', '2335', 
        '713', '2223', '331', '247', '519', '222223', '97', '277', '3311', '2255'
    ]

    const [symbolResponse, setSymbolResponse] = useState("");

    const disableKeyPressRef = useRef(false);

    const gameOver = () => {
        setSymbolResponse("check");
        setTimeout(() => {
          let newKeys1Color = keys1Color;
          newKeys1Color[6] = 1;
          setKeys1Color(newKeys1Color)
          setGameChosen({ gameChosen: false, gameNumber: '' });
        }, 1000);
    }

    const resetBadProduct = () => {
        disableKeyPressRef.current = true;
        setSymbolResponse("times");
        setTimeout(() => {
            setKeys0(["1", "2", "3", "4", "5", "6", "7", "8", "9"]);
            setKeys1(["", "", "x", "", "=", "", ""]);
            setKeys2(["", "x", "", "=", "", ""]);
            setSymbolResponse("");
            disableKeyPressRef.current = false;
        }, 500);
    }

    const findProduct = () => {
        let newKeys0 = [...keys0];
        let newKeys1 = [...keys1];
        let newKeys2 = [...keys2];
        if (keys1[0] !== "" && keys1[1] !== "" && keys1[3] !== "" && keys1.includes("")) {
            const keys1Int1 = parseInt(keys1.slice(0,2).join(""));
            const keys1Int2 = parseInt(keys1[3]);
            const product = keys1Int1*keys1Int2;
            console.log(product);
            if (product < 100) {
                const digitsArray = product.toString().split('');
                const bothDigitsExistInKeys0 = digitsArray.every((digit) => keys0.includes(digit));
                if (bothDigitsExistInKeys0) {
                    newKeys1[5] = digitsArray[0];
                    newKeys1[6] = digitsArray[1];
                    setKeys1(newKeys1);
                    digitsArray.forEach((val) => {
                        let returnIndex = keys0.indexOf(val);
                        newKeys0[returnIndex] = "";
                    })
                    setKeys0(newKeys0);
                } else {
                    let newDigitsArray = [...digitsArray];
                    digitsArray.forEach((val) => {
                        if (!keys0.includes(val)) {
                            let returnIndex = digitsArray.indexOf(val);
                            newDigitsArray[returnIndex] = "";
                        };
                    })
                    newKeys1[5] = digitsArray[0];
                    newKeys1[6] = digitsArray[1];
                    setKeys1(newKeys1);
                    resetBadProduct();
                }
            } else {
                resetBadProduct();
            }
        } else if (!keys1.includes("") && keys2[0] !== "" && keys2[2] !== "" && keys2.includes("")) {
            const keys2Int1 = parseInt(keys2[0]);
            const keys2Int2 = parseInt(keys2[2]);
            const product = keys2Int1*keys2Int2;
            if (product > 9 && product < 100) {
                const digitsArray = product.toString().split('');
                const bothDigitsExistInKeys0 = digitsArray.every((digit) => keys0.includes(digit));
                if (bothDigitsExistInKeys0) {
                    newKeys2[4] = digitsArray[0];
                    newKeys2[5] = digitsArray[1];
                    setKeys2(newKeys2);
                    digitsArray.forEach((val) => {
                        let returnIndex = keys0.indexOf(val);
                        newKeys0[returnIndex] = "";
                    })
                    setKeys0(newKeys0);
                    gameOver();
                } else {
                    let newDigitsArray = [...digitsArray];
                    digitsArray.forEach((val) => {
                        if (!keys0.includes(val)) {
                            let returnIndex = digitsArray.indexOf(val);
                            newDigitsArray[returnIndex] = "";
                        };
                    })
                    newKeys2[4] = digitsArray[0];
                    newKeys2[5] = digitsArray[1];
                    setKeys2(newKeys2);
                    resetBadProduct();
                }
            } else {
                resetBadProduct();
            }
        } else {

        }
    };

    useEffect(() => {
        findProduct()
    }, [keys1, keys2]);

    const addNumber = (key) => {
        let newKeys0 = [...keys0]
        let newKeys1 = [...keys1]
        let newKeys2 = [...keys2]
        let newPlayableArray = [keys1[0], keys1[1], keys1[3], keys2[0], keys2[2]];
        console.log(newPlayableArray);
        if (keys0.includes(key)) {
            const emptyIndex = newPlayableArray.findIndex((val) => val === "");
            const keyIndex = newKeys0.findIndex((val) => val === key);
            if (emptyIndex < 2) {
                if (newKeys1[0] === "") {
                    newKeys1[0] = key;
                } else if (newKeys1[1] === "") {
                    newKeys1[1] = key;
                }
                setKeys1(newKeys1)
            } else if (emptyIndex === 2) {
                newKeys1[3] = key;
                setKeys1(newKeys1)
            } else if (emptyIndex > 2) {
                if (newKeys2[0] === "") {
                    newKeys2[0] = key;
                } else if (newKeys2[2] === "") {
                    newKeys2[2] = key;
                }
                setKeys2(newKeys2)
            } else {
                return
            }
            newKeys0[keyIndex] = "";
            setKeys0(newKeys0)
        }
        
    }

    const handleKeyboard = useCallback((event) => {
        if (disableKeyPressRef.current) {
            event.preventDefault();
            return;
        } else if (event.key === " ") {
            setGameChosen({gameChosen: false, gameNumber: ''});
        } else {
            keys0.forEach((key) => {
                if (event.key === key) {
                    addNumber(key)
            }});
        }
    });

    useEffect(() => {
        document.addEventListener("keydown", handleKeyboard);

        return () => {
            document.removeEventListener("keydown", handleKeyboard);
        };
    }, [handleKeyboard]);

    return (
        <div className="keyboard" onKeyDown={handleKeyboard}>
            <KeyboardUContext.Provider
                value={{
                addNumber}}>
            <div className='line0'>{keys0.map((key, index) => {
                const uniqueKey = `0-${index}`;
                return <Key keyVal={key} key={uniqueKey} clickableKey={true} />;
            })}</div>
            <div className='line1'>
                {keys1.map((key, index) => {
                const uniqueKey = `1-${index}`;
                const isSymbol = index === 2 || index === 4;
                return <Key keyVal={key} key={uniqueKey} clickableKey={false} symbol={isSymbol ? true : undefined} dark />;
            })}</div>
            <div className='line2'>
                {keys2.map((key, index) => {
                const uniqueKey = `2-${index}`;
                const isSymbol = index === 1 || index === 3;
                return <Key keyVal={key} key={uniqueKey} clickableKey={false} symbol={isSymbol ? true : undefined} dark />;})}
            </div>
            <div className='line3'>< Spacebar keyVal={symbolResponse} /></div>
            </KeyboardUContext.Provider>
        </div>
    )

}

export default KeyboardU