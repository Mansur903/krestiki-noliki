import { useImmer } from "use-immer";
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import PreparePlayer from "./components/PreparePlayer.jsx";
import GameField from './components/GameField/GameField.jsx';
import ChooseField from './components/ChooseField.jsx';

function App() {
  const [state, setState] = useImmer({
    firstPlayer: {
      name: 'Player 1',
      isReady: false,
    },
    secondPlayer: {
      name: 'Player 2',
      isReady: false,
    },
    step: 'prepareFirstPlayer',
    fieldSize: 3,
    gameProgress: {
      first: [],
      second: [],
      currentPlayer: '',
    },
  });

  const { first } = state.gameProgress;
  const { second } = state.gameProgress;

  const onReadyFirstPlayer = (name) => {
    setState(state => {
      state.firstPlayer.isReady = true;
      state.firstPlayer.name = name;
      state.gameProgress.currentPlayer = name;
      state.step = 'prepareSecondPlayer';
    })
  };

  const onReadySecondPlayer = (name) => {
    setState(state => {
      state.secondPlayer.isReady = true;
      state.secondPlayer.name = name;
      state.step = 'chooseFieldSize';
    })
  };

  const setSize = (size) => {
    setState(state => {
      state.fieldSize = size;
      state.step = 'game';
    })
  }

  const checkWin = () => {
    let combinations = [
      '012',
      '345',
      '678',
      '036',
      '147',
      '258',
      '048',
      '246',
    ];
    const firstResults = [...first];
    const secondResults = [...second];
    console.log('firstResults.sort().join :', firstResults.sort().join(''));
    combinations.forEach((item) => {
      if (item === firstResults.sort().join('')) {
        console.log('firstWin');
      };
      if (item === secondResults.sort().join('')) {
        console.log('secondWin');
      };
    });
  }

  const makeMove = (e) => {
    const current = state.gameProgress.currentPlayer;
    if (first.includes(e.target.id) || second.includes(e.target.id)) return null;
    e.target.textContent = 'X';
    if (current === state.firstPlayer.name) {
      const movesList = [...state.gameProgress.first];
      movesList.push(e.target.id);
      setState(state => {
        state.gameProgress.currentPlayer = state.secondPlayer.name;
        state.gameProgress.first = movesList;
      });

    } else {
      e.target.textContent = 'O';
      setState(state => {
        const movesList = [...state.gameProgress.second];
        movesList.push(e.target.id);
        state.gameProgress.currentPlayer = state.firstPlayer.name;
        state.gameProgress.second = movesList;
      });
    }
    checkWin();
    console.log('state :', state);
  }

  switch(state.step) {
    case 'prepareFirstPlayer':
      return (<PreparePlayer onReady={onReadyFirstPlayer} step={state.step} />)
    case 'prepareSecondPlayer':
      return (<PreparePlayer onReady={onReadySecondPlayer} step={state.step} />)
    case 'chooseFieldSize':
      return (<ChooseField setSize={setSize} />)
    case 'game':
      return (<GameField size={state.fieldSize} makeMove={makeMove} currentPlayer={state.gameProgress.currentPlayer} />)
    default:
  };
}

export default App;
