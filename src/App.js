import './App.css';
import Keyboard from './components/Keyboard';
import Keyboard1 from './components/Game1/Keyboard1';
import Keyboard2 from './components/Game2/Keyboard2';
import Keyboard3 from './components/Game3/Keyboard3';
import Keyboard4 from './components/Game4/Keyboard4';
import Keyboard5 from './components/Game5/Keyboard5';
import Keyboard6 from './components/Game6/Keyboard6';
import Keyboard7 from './components/Game7/Keyboard7';
import Keyboard8 from './components/Game8/Keyboard8';
import Keyboard9 from './components/Game9/Keyboard9';
import Keyboard0 from './components/Game0/Keyboard0';
import KeyboardQ from './components/GameQ/KeyboardQ';
import KeyboardW from './components/GameW/KeyboardW';
import KeyboardE from './components/GameE/KeyboardE';
import KeyboardR from './components/GameR/KeyboardR';
import KeyboardT from './components/GameT/KeyboardT';
import KeyboardY from './components/GameY/KeyboardY';
import KeyboardU from './components/GameU/KeyboardU';
import { createContext, useEffect, useState } from 'react';

export const AppContext = createContext();

function App() {
  const [gameChosen, setGameChosen] = useState({
    gameChosen: false,
    gameNumber: '',
  })

  const [keys0Color, setKeys0Color] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [keys1Color, setKeys1Color] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [keys2Color, setKeys2Color] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [keys3Color, setKeys3Color] = useState([0, 0, 0, 0, 0, 0, 0]);
  
  const chooseGame = (keyVal) => {
    if (gameChosen.gameChosen === true) return;
    const newSelectedLetter = keyVal;
    setGameChosen({gameChosen: true, gameNumber: newSelectedLetter});
  };

  useEffect(() => {
    console.log(gameChosen)
  }, [gameChosen])
  
  return (
    <div className="App">
      <AppContext.Provider
        value={{
          chooseGame,
          gameChosen,
          setGameChosen,
          keys0Color,
          setKeys0Color,
          keys1Color,
          setKeys1Color,
          keys2Color,
          setKeys2Color,
          keys3Color,
          setKeys3Color}}>
        <div className='game'>
          {
            {
              '1': <Keyboard1 />,
              '2': <Keyboard2 />,
              '3': <Keyboard3 />,
              '4': <Keyboard4 />,
              '5': <Keyboard5 />,
              '6': <Keyboard6 />,
              '7': <Keyboard7 />,
              '8': <Keyboard8 />,
              '9': <Keyboard9 />,
              '0': <Keyboard0 />,
              'Q': <KeyboardQ />,
              'W': <KeyboardW />,
              'E': <KeyboardE />,
              'R': <KeyboardR />,
              'T': <KeyboardT />,
              'Y': <KeyboardY />,
              'U': <KeyboardU />,
              '': <Keyboard />,
            }[gameChosen.gameNumber]
          }
        </div>

      </AppContext.Provider>
    </div>

  );
}

export default App;
