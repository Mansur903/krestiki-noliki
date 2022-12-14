import React from 'react';
import _ from 'lodash';
import { Alert, Button, Modal } from 'react-bootstrap';

import './styles.css';

function GameField(props) {
  const {size, makeMove, cancelMove, gameProgress, firstPlayerName, restart, winnersCountByPlayer} = props;
  const { currentPlayer, finished, firstPlayerMoves, secondPlayerMoves } = gameProgress;
  const [modalShow, setModalShow] = React.useState(false);
  const [field, setField] = React.useState(
    [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
  );
  const [movesList, setList] = React.useState([]);
    
  const handleMove = (row, column) => (e) => {
    if (finished !== true && !firstPlayerMoves.includes(Number(e.target.id)) && !secondPlayerMoves.includes(Number(e.target.id))) {
      makeMove(e);
      const newField = [...field];
      currentPlayer === firstPlayerName ? newField[row][column] = 'X' : newField[row][column] = 'O';
      setField(newField);
      const newMovesList = [...movesList, ...[[row, column]]];
      setList(newMovesList);
    }
  };

  const handleRestart = () => {
    restart();
    setField(
      [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
    );
    setList([]);
  };

  const handleRestartWithOthers = () => {
    restart('otherPlayers');
    setField(
      [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
    );
    setList([]);
  }

  const isDraw = () => !finished && ((firstPlayerMoves.length + secondPlayerMoves.length) === size*size);

  const handleCancelMove = () => {
    cancelMove();
    const newList = [...movesList];
    const [row, column] = newList.pop();
    const newField = [...field];
    newField[row][column] = null;
    setList(newList);
    setField(newField);
  }

  function PlayersRatingModal(props) {
    return (
      <Modal
        {...props}
       
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            ?????????????? ??????????????
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex">
            <h6 className="w-50">?????? ????????????</h6>
            <h6>???????????????????? ??????????</h6>
          </div>
          <div className="d-flex">
            <ul className="p-0 w-50 list-unstyled">
              {ratingList().map((item) => <li key={_.uniqueId()}>{item}:<hr /></li>)}
            </ul>
            <ul className="p-0 w-50 list-unstyled">
              {ratingList().map((item) => <li key={_.uniqueId()}>{winnersCountByPlayer[item]}<hr /></li>)}
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>??????????????</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const handleShowRating = () => {
    setModalShow(true);
  };

  const ratingList = () => {
    return Object.entries(winnersCountByPlayer)
    .sort(([,a],[,b]) => b - a)
    .map(([key,]) => key);
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center h-100">
      <div className="mb-4">?????????? ??????????: <b>{currentPlayer}</b></div>
      <div className="d-flex justify-content-center align-items-center">
        <table className='sss'>
          <tbody>
            {field.map((row, rowIndex) => 
              <tr key={_.uniqueId()}>{row.map((column, colIndex) => 
                <td onClick={handleMove(rowIndex, colIndex)} className="cell" id={size*rowIndex+colIndex} key={size*rowIndex+colIndex}>{field[rowIndex][colIndex]}</td>)}
              </tr>)}
          </tbody>
          </table>
      </div>
      <Button onClick={handleCancelMove} disabled={isDraw() || finished || movesList.length === 0} className='m-4' variant="outline-primary">???????????????? ??????</Button>
      <Alert show={finished} className="mt-5" variant="success">
        <Alert.Heading>???????? ??????????????????!</Alert.Heading>
        <p>
          ???????????????????? - {currentPlayer}.
        </p>
        <hr />
        <Button className='m-2' onClick={handleRestart} variant="outline-success">???????????? ????????????</Button>
        <Button className='m-2' onClick={handleRestartWithOthers} variant="outline-secondary">???????????? ???????????? ?? ?????????????? ????????????????</Button>
        <Button onClick={handleShowRating} className='m-2' variant="outline-primary">???????????????????? ?????????????? ??????????????</Button>
      </Alert>

      <Alert show={isDraw()} className="mt-5" variant="secondary">
        <Alert.Heading>???????? ??????????????????!</Alert.Heading>
        <p>
          ??????????.
        </p>
        <hr />
        <Button className='m-2' onClick={handleRestart} variant="outline-success">???????????? ????????????</Button>
        <Button className='m-2' onClick={handleRestartWithOthers} variant="outline-secondary">???????????? ???????????? ?? ?????????????? ????????????????</Button>
        <Button onClick={handleShowRating} className='m-2' variant="outline-primary">???????????????????? ?????????????? ??????????????</Button>
      </Alert>
      <PlayersRatingModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  )
}

export default GameField;