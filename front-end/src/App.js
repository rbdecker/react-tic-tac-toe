import { useState } from 'react';
import './App.css';
import TicTacToeGame from './TicTacToeGame';

function App() {
  const [gameMode, setGameMode] = useState('');

  return (
    <div className="content-container">
      {gameMode ? null : (
        <>
        <button onClick={() => setGameMode('auto')}>Automatic Match-Up</button>
        <button onClick={() => setGameMode('host')}>Host a Game</button>
        <button onClick={() => setGameMode('join')}>Join a Game by ID</button>
        </>
      )}
      {gameMode === 'auto' && <TicTacToeGame />}
    </div>
  );
}

export default App;
