/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useImmer } from "use-immer";
import 'bootstrap/dist/css/bootstrap.min.css';

import PreparePlayer from "./components/PreparePlayer.jsx";
import GameField from './components/GameField/GameField.jsx';
import ChooseField from './components/ChooseField.jsx';

function App() {
  const [state, setState] = useImmer({
    firstPlayerName: undefined,
    secondPlayerName: undefined,
    step: 'prepareFirstPlayer',
    fieldSize: 3,
    gameProgress: {
      firstPlayerMoves: [],
      secondPlayerMoves: [],
      currentPlayer: undefined,
      finished: false,
    },
    winnersCountByPlayer: {},
  });

  const { firstPlayerMoves } = state.gameProgress;
  const { secondPlayerMoves } = state.gameProgress;

  const onReadyFirstPlayer = (name) => {
    setState(state => {
      state.firstPlayerName = name;
      state.gameProgress.currentPlayer = name;
      if (!state.winnersCountByPlayer[name]) state.winnersCountByPlayer[name] = 0;
      state.step = 'prepareSecondPlayer';
    })
  };

  const onReadySecondPlayer = (name) => {
    setState(state => {
      state.secondPlayerName = name;
      if (!state.winnersCountByPlayer[name]) state.winnersCountByPlayer[name] = 0;
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
    console.log('state.current: ', state.gameProgress.currentPlayer)
    combinations.forEach((item) => {
      if (contains(firstPlayerMoves, item)) {
        setState(state => {
          state.gameProgress.finished = true;
          state.gameProgress.currentPlayer = state.firstPlayerName;
          state.winnersCountByPlayer[state.firstPlayerName] += 1;
        });
      };
      if (contains(secondPlayerMoves, item)) {
        setState(state => {
          state.gameProgress.finished = true;
          state.gameProgress.currentPlayer = state.secondPlayerName;
          state.winnersCountByPlayer[state.secondPlayerName] += 1;
        });
      };
    });
  }

  React.useEffect(() => {
    checkWin();
  }, [state.gameProgress.firstPlayerMoves, state.gameProgress.secondPlayerMoves]);

  React.useEffect(() => {
    console.log('state.current: ', state.gameProgress.currentPlayer)
  }, [state])

  const makeMove = (e) => {
    const currentPlayer = state.gameProgress.currentPlayer;
    if (firstPlayerMoves.includes(Number(e.target.id)) || secondPlayerMoves.includes(Number(e.target.id)) || state.gameProgress.finished === true) return null;
    if (currentPlayer === state.firstPlayerName) {
      setState(state => {
        state.gameProgress.firstPlayerMoves.push(Number(e.target.id));
        state.gameProgress.currentPlayer = state.secondPlayerName;
      });
    } else {
      setState(state => {
        state.gameProgress.secondPlayerMoves.push(Number(e.target.id));
        state.gameProgress.currentPlayer = state.firstPlayerName;
      });
    }
  }

  const cancelMove = () => {
    const currentPlayer = state.gameProgress.currentPlayer;
    if (currentPlayer === state.firstPlayerName) {
      setState(state => {
        state.gameProgress.currentPlayer = state.secondPlayerName;
        state.gameProgress.second.pop();
      })
    } else {
      setState(state => {
        state.gameProgress.currentPlayer = state.firstPlayerName;
        state.gameProgress.firstPlayerMoves.pop();
      })
    }
  }

  const restart = (param) => {
    if (param === 'otherPlayers') {
      setState(state => {state.step = 'prepareFirstPlayer'});
    }
    setState(state => {
      state.gameProgress.firstPlayerMoves = [];
      state.gameProgress.secondPlayerMoves = [];
      state.gameProgress.currentPlayer = state.firstPlayerName;
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
      return (<GameField size={state.fieldSize} makeMove={makeMove} cancelMove={cancelMove} winnersCountByPlayer={state.winnersCountByPlayer}
        restart={restart} gameProgress={state.gameProgress} firstPlayerName={state.firstPlayerName} />)
    default:
  };
}

export default App;
