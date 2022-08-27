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
  });

  const onReadyFirstPlayer = (name) => {
    setState((state) => {
      state.firstPlayer.isReady = true;
      state.firstPlayer.name = name;
      state.step = 'prepareSecondPlayer';
    })
  };

  const onReadySecondPlayer = (name) => {
    setState((state) => {
      state.secondPlayer.isReady = true;
      state.secondPlayer.name = name;
      state.step = 'chooseFieldSize';
    })
  };

  const setSize = (size) => {
    setState((state) => {
      state.fieldSize = size
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
      return (<GameField />)
    default:
  };
}

export default App;
