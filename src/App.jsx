/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useImmer } from "use-immer";
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import PreparePlayer from "./components/PreparePlayer.jsx";
import GameField from './components/GameField/GameField.jsx';
import ChooseField from './components/ChooseField.jsx';

function App() {
  const [state, setState] = useImmer({
    firstPlayer: {
      name: undefined,
    },
    secondPlayer: {
      name: undefined,
    },
    step: 'prepareFirstPlayer',
    fieldSize: 3,
    gameProgress: {
      first: [],
      second: [],
      currentPlayer: undefined,
      finished: false,
    },
    winners: {},
  });

  const { first } = state.gameProgress;
  const { second } = state.gameProgress;

  const onReadyFirstPlayer = (name) => {
    setState(state => {
      state.firstPlayer.name = name;
      state.gameProgress.currentPlayer = name;
      if (!state.winners[name]) state.winners[name] = 0;
      state.step = 'prepareSecondPlayer';
    })
  };

  const onReadySecondPlayer = (name) => {
    setState(state => {
      state.secondPlayer.name = name;
      if (!state.winners[name]) state.winners[name] = 0;
      state.step = 'chooseFieldSize';
    })
  };

  const setSize = (size) => {
    setState(state => {
      state.fieldSize = size;
      state.step = 'game';
    })
  };

  const checkWin = () => {
    function contains(where, what){
      for(let i = 0; i < what.length; i++){
          if(where.indexOf(what[i]) === -1) return false;
      }
      return true;
    }
    let combinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    const firstResults = [...first];
    const secondResults = [...second];
    combinations.forEach((item) => {
      if (contains(firstResults, item)) {
        setState(state => {
          state.gameProgress.finished = true;
          state.gameProgress.currentPlayer = state.firstPlayer.name;
          state.winners[state.firstPlayer.name] += 1;
        });
      };
      if (contains(secondResults, item)) {
        setState(state => {
          state.gameProgress.finished = true;
          state.gameProgress.currentPlayer = state.secondPlayer.name;
          state.winners[state.secondPlayer.name] += 1;
        });
      };
    });
  }

  React.useEffect(() => {
    checkWin();
  }, [state.gameProgress.first, state.gameProgress.second]);

  React.useEffect(() => {
  }, [state.winners])

  const makeMove = (e) => {
    const currentPlayer = state.gameProgress.currentPlayer;
    if (first.includes(Number(e.target.id)) || second.includes(Number(e.target.id)) || state.gameProgress.finished === true) return null;
    if (currentPlayer === state.firstPlayer.name) {
      setState(state => {
        state.gameProgress.first.push(Number(e.target.id));
        state.gameProgress.currentPlayer = state.secondPlayer.name;
      });
    } else {
      setState(state => {
        state.gameProgress.second.push(Number(e.target.id));
        state.gameProgress.currentPlayer = state.firstPlayer.name;
      });
    }
  }

  const cancelMove = () => {
    const currentPlayer = state.gameProgress.currentPlayer;
    if (currentPlayer === state.firstPlayer.name) {
      setState(state => {
        state.gameProgress.currentPlayer = state.secondPlayer.name;
        state.gameProgress.second.pop();
      })
    } else {
      setState(state => {
        state.gameProgress.currentPlayer = state.firstPlayer.name;
        state.gameProgress.first.pop();
      })
    }
  }

  const restart = (param) => {
    if (param === 'otherPlayers') {
      setState(state => {state.step = 'prepareFirstPlayer'});
    }
    setState(state => {
      state.gameProgress.first = [];
      state.gameProgress.second = [];
      state.gameProgress.currentPlayer = state.firstPlayer.name;
      state.gameProgress.finished = false;
    })
  }

  switch(state.step) {
    case 'prepareFirstPlayer':
      return (<PreparePlayer onReady={onReadyFirstPlayer} step={state.step} />)
    case 'prepareSecondPlayer':
      return (<PreparePlayer onReady={onReadySecondPlayer} step={state.step} />)
    case 'chooseFieldSize':
      return (<ChooseField setSize={setSize} />)
    case 'game':
      return (<GameField size={state.fieldSize} makeMove={makeMove} cancelMove={cancelMove} winners={state.winners}
        restart={restart} gameProgress={state.gameProgress} firstPlayerName={state.firstPlayer.name} />)
    default:
  };
}

export default App;
