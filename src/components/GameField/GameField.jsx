import './styles.css';
import _ from 'lodash';

function GameField(props) {
  const {size, makeMove, currentPlayer} = props;

  const handleClick = (e) => {
    makeMove(e);
  };
  let counter = 0;

  return (
    <div className="d-flex flex-column justify-content-center align-items-center h-100">
      <div className="mb-4">Ходит игрок: {currentPlayer}</div>
      <div className="d-flex justify-content-center align-items-center">
        <table className='sss'>
          <tbody>
            {
              _.fill(Array(size), 1).map(() => {
                return <tr key={counter}>{_.fill(Array(size), 1).map(() => {
                  const id = counter;
                  counter++;
                  return <td id={id} key={id} onClick={handleClick} className="cell"></td>
                })}</tr>
              })
            }
          </tbody>
          </table>
      </div>
    </div>
  )
}

export default GameField;