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
      <span className='mb-3'>В дальнейшем полей будет больше</span>
    </div>
  )
}

export default ChooseField;