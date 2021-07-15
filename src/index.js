import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

function Square(props) {
  return (
    <button className={props.style} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square 
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        style={this.props.styles[i]}
      />
    );
  }

  render() {
    const board = [];
    for (let i=0; i < 3; i++) {
      let squares = [];
      for (let j=0; j < 3; j++) {
        squares.push(this.renderSquare(3*i+j))
      };
      board.push(<div className="board-row">{squares}</div>);
    };
    return (
      <div>
        {board}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: false,
      reverse: false,
      styles: Array(9).fill('square'),
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 1,
    });
  }

  reverseButton() {
    this.setState({
      reverse: !this.state.reverse,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const styles = this.state.styles;

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move:
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      if (winner === 'Draw') {
        status = 'Draw';
      } else {
        status = 'Winner: ' + winner[0];
        const [a, b, c] = winner[1];
        styles[a] = 'square-win';
        styles[b] = 'square-win';
        styles[c] = 'square-win';
      }
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            styles={styles}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => this.reverseButton()}>Reverse</button>
          {!this.state.reverse
            ? <ol>{moves}</ol>
            : <ol className="ol-reverse">{moves}</ol>
          }
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i=0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], [a, b, c]];
    }
  }
  if (!squares.includes(null)) {
    return 'Draw';
  }
  return null;
}

ReactDOM.render(
  //<React.StrictMode>
  //  <App />
  //</React.StrictMode>,
  <Game />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
