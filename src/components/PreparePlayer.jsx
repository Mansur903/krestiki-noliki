import React from 'react';
import { Button, Form } from 'react-bootstrap';

function PreparePlayer(props) {
  const [inputState, setInput] = React.useState('');

  const { onReady, step } = props;

  const handleChange = (e) => {
    setInput(e.target.value)
  };

  const handleClick = () => {
    if(inputState !== '') {
      onReady(inputState);
      setInput('');
    }
  }

  const whichPlayer = () => {
    switch(step) {
      case 'prepareFirstPlayer':
        return 1;
      case 'prepareSecondPlayer':
        return 2;
      default:
    }
  };


  return(
    <div className='container-sm col-5 d-flex flex-column justify-content-center align-items-center vh-100'>
      <h1 className="mb-5">Введите имя и подтвердите готовность игрока {whichPlayer()}</h1>
      <Form className="col-12">
        <Form.Control
          type="text"
          className="p-3 mb-4"
          onChange={handleChange}
          value={inputState}
          required
          name='name'
        />
        <Button type="submit" onClick={handleClick} className="col-12 p-2 mb-3" variant="primary">Готов</Button>
      </Form>
    </div>
  )

};

export default PreparePlayer;