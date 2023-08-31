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
import KeyboardI from './components/GameI/KeyboardI';
import KeyboardO from './components/GameO/KeyboardO';
import KeyboardP from './components/GameP/KeyboardP';
import KeyboardA from './components/GameA/KeyboardA';
import KeyboardS from './components/GameS/KeyboardS';
import KeyboardD from './components/GameD/KeyboardD';
import KeyboardF from './components/GameF/KeyboardF';
import KeyboardG from './components/GameG/KeyboardG';
import KeyboardH from './components/GameH/KeyboardH';
import KeyboardJ from './components/GameJ/KeyboardJ';
import KeyboardK from './components/GameK/KeyboardK';
import KeyboardL from './components/GameL/KeyboardL';
import KeyboardZ from './components/GameZ/KeyboardZ';
import KeyboardX from './components/GameX/KeyboardX';
import KeyboardC from './components/GameC/KeyboardC';
import KeyboardV from './components/GameV/KeyboardV';
import KeyboardB from './components/GameB/KeyboardB';
import KeyboardN from './components/GameN/KeyboardN';
import KeyboardM from './components/GameM/KeyboardM';
import { createContext, useEffect, useState } from 'react';

export const AppContext = createContext();

function App() {
    const [gameChosen, setGameChosen] = useState({
        gameChosen: false,
        gameNumber: '',
    })

    const [keysColor, setKeysColor] = useState([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ]);
  
    const chooseGame = (keyVal) => {
        if (gameChosen.gameChosen === true) return;
        const newSelectedLetter = keyVal;
        setGameChosen({gameChosen: true, gameNumber: newSelectedLetter});
    };
  
    return (
      <div className="App">
        <AppContext.Provider
          value={{
            chooseGame,
            gameChosen,
            setGameChosen,
            keysColor,
            setKeysColor,}}>
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
                      'I': <KeyboardI />,
                      'O': <KeyboardO />,
                      'P': <KeyboardP />,
                      'A': <KeyboardA />,
                      'S': <KeyboardS />,
                      'D': <KeyboardD />,
                      'F': <KeyboardF />,
                      'G': <KeyboardG />,
                      'H': <KeyboardH />,
                      'J': <KeyboardJ />,
                      'K': <KeyboardK />,
                      'L': <KeyboardL />,
                      'Z': <KeyboardZ />,
                      'X': <KeyboardX />,
                      'C': <KeyboardC />,
                      'V': <KeyboardV />,
                      'B': <KeyboardB />,
                      'N': <KeyboardN />,
                      'M': <KeyboardM />,
                      '': <Keyboard />,
                  }[gameChosen.gameNumber]
              }
          </div>

        </AppContext.Provider>
      </div>

    );
}

export default App;
