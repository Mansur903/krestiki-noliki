// import './styles.css';

import { Button, Form } from 'react-bootstrap';

function Readiness(props) {
  const { state, setState } = props;
  const isReadyFirst = state.firstPlayer.isReady;

  const currentUnreadyPlayer = () => {
    if(isReadyFirst === false) {
      return 1;
    } else {
      return 2;
    }
  }

  const setName = (player) => {
    if(state.nameInput === '') {
      setState((state) => {
        state[player].name = 'Player 1';
      })
    } else {
      setState((state) => {
        state[player].name = state.nameInput;
      })
    }
  }

  const makeReady = () => {
    if(isReadyFirst === false) {
      setState((state) => {
        state.firstPlayer.isReady = true;
      });
      setName('firstPlayer');
    } else {
      setState((state) => {
        state.secondPlayer.isReady = true;
      });
      setName('secondPlayer');
    }
    setState((state) => {state.nameInput = ''});
    console.log('state :', state);
  }

  const handleChange = (e) => {
    setState((state) => {
      state.nameInput = e.target.value;
    })
    console.log('state :', state);
  }

  if(state.firstPlayer.isReady === true && state.secondPlayer.isReady === true) {
    return null;
  } else {
    return(
      <div className='container-sm col-5 d-flex flex-column justify-content-center align-items-center vh-100'>
        <h1 className="mb-5">Подтвердите готовность игрока {currentUnreadyPlayer()}</h1>
        <Form.Control
          placeholder={`Player ${currentUnreadyPlayer()}`}
          type="text"
          id="input"
          className="p-3 mb-4"
          onChange={handleChange}
          value={state.nameInput}
        />
        <Button onClick={makeReady} className="col-12 p-2 mb-3" variant="primary">Готов</Button>
      </div>
    )
  }

};

export default Readiness;