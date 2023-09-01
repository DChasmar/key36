import './App.css';
import Keyboard from './components/Keyboard';
import { createContext, useState, lazy, Suspense } from 'react';

const generateKeyboardComponent = (letter) => {
  return lazy(() => import(`./components/Game${letter}/Keyboard${letter}`));
};

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