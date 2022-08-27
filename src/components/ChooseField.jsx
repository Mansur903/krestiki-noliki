import { Button } from 'react-bootstrap';
import React from 'react';

function ChooseField(props) {
  const { setSize } = props;

  const handleClick = (size) => () => {
    setSize(size);
  }

  return (
    <div className='d-flex flex-column justify-content-center align-items-center vh-100'>
      <span className='mb-3 fw-bold'>Выберите размер поля</span>
      <Button onClick={handleClick(3)} className='col-5 mb-3' variant='primary'>3x3</Button>
      <Button onClick={handleClick(5)} className='col-5 mb-3' variant='primary'>5x5</Button>
      <Button onClick={handleClick(10)} className='col-5 mb-3' variant='primary'>10x10</Button>
    </div>
  )
}

export default ChooseField;