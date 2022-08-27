import { useImmer } from "use-immer";
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Readiness from "./components/Readiness.jsx";

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
    nameInput: '',
  });

  return (
    <main className="main">
      <Readiness state={state} setState={setState} />
      <div className="App">
        Hello world
      </div>
    </main>
  );
}

export default App;
