import './App.css';
import Keyboard from './components/Keyboard';
import HelpButton from './components/HelpButton';
import { createContext, useState, lazy, Suspense, useEffect } from 'react';
import { readSavedGameProgress, writeSavedGameProgress } from './utils';

const generateKeyboardComponent = (letter) => {
  return lazy(() => import(`./components/Game${letter}/Keyboard${letter}`));
};

export const AppContext = createContext();

function App() {
    const [gameChosen, setGameChosen] = useState({
        gameChosen: false,
        gameNumber: '',
    })

    const [keysColor, setKeysColor] = useState(readSavedGameProgress());

    useEffect(() => {
      writeSavedGameProgress(keysColor);
    }, [keysColor]);

    const modalContent = (
      <div>
        <p>This website is designed to be used without instructions.</p>
        <p>
          <strong>Instructions:</strong>
        </p>
        <ul>
          <li>Each keyboard key leads to a different game.</li>
          <li>When you complete a game, the key on the homepage will turn blue.</li>
          <li>To return to the homepage, press the spacebar.</li>
        </ul>
        <div>
           
        </div>
      </div>
    );
  
    const chooseGame = (keyVal) => {
        if (gameChosen.gameChosen === true) return;
        const newSelectedLetter = keyVal;
        setGameChosen({gameChosen: true, gameNumber: newSelectedLetter});
    };
  
    const KeyboardComponent = generateKeyboardComponent(gameChosen.gameNumber);

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
          <HelpButton content={modalContent} />
            {gameChosen.gameNumber ? (
              <Suspense fallback={<Keyboard />}>
                <KeyboardComponent />
              </Suspense>
            ) : <Keyboard />}
          </div>

        </AppContext.Provider>
      </div>

    );
}

export default App;