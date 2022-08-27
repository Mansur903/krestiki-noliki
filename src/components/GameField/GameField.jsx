import './styles.css';

function GameField() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <table className='sss'>
        <tbody>
          <tr>
            <td className="cell"></td>
            <td className="cell"></td>
            <td className="cell"></td>
          </tr>
          <tr>
            <td className="cell"></td>
            <td className="cell"></td>
            <td className="cell"></td>
          </tr>
          <tr>
            <td className="cell"></td>
            <td className="cell"></td>
            <td className="cell"></td>
          </tr>
        </tbody>
        </table>
    </div>
  )
}

export default GameField;