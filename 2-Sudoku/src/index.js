import React, { createElement } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { makepuzzle, solvepuzzle } from "sudoku";

function AddOne(puzzle) {
    for (let i = 0; i < puzzle.length; i++) {
        if (puzzle[i] !== null) {
            puzzle[i] = puzzle[i] + 1;
        }
    }
    return puzzle;
}

let PUZZLE = makepuzzle();
let SOLUTION = solvepuzzle(PUZZLE);

PUZZLE = AddOne(PUZZLE);
SOLUTION = AddOne(SOLUTION);


function Cell(props) {
    return (
        <text
            className={props.className}
            min="0" max="8"
            maxLength="1"
            onClick={props.onClick}>
            {props.value}
        </text>
    );
}

class Board extends React.Component {
    getClassName(i) {
        let cName = "cell";
        if (PUZZLE[i] !== null) {
            cName += " hintCell";
        }
        return cName;
    }

    renderCell(i) {
        return (
            <Cell
                className={this.getClassName(i)}
                value={this.props.cells[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
            <tbody className='board'>
                <tr className='board-row'>
                    <td>{this.renderCell(0)}</td>
                    <td>{this.renderCell(1)}</td>
                    <td>{this.renderCell(2)}</td>
                    <td>{this.renderCell(3)}</td>
                    <td>{this.renderCell(4)}</td>
                    <td>{this.renderCell(5)}</td>
                    <td>{this.renderCell(6)}</td>
                    <td>{this.renderCell(7)}</td>
                    <td>{this.renderCell(8)}</td>
                </tr>
                <tr className='board-row'>
                    <td>{this.renderCell(9)}</td>
                    <td>{this.renderCell(10)}</td>
                    <td>{this.renderCell(11)}</td>
                    <td>{this.renderCell(12)}</td>
                    <td>{this.renderCell(13)}</td>
                    <td>{this.renderCell(14)}</td>
                    <td>{this.renderCell(15)}</td>
                    <td>{this.renderCell(16)}</td>
                    <td>{this.renderCell(17)}</td>
                </tr>
                <tr className='board-row'>
                    <td>{this.renderCell(18)}</td>
                    <td>{this.renderCell(19)}</td>
                    <td>{this.renderCell(20)}</td>
                    <td>{this.renderCell(21)}</td>
                    <td>{this.renderCell(22)}</td>
                    <td>{this.renderCell(23)}</td>
                    <td>{this.renderCell(24)}</td>
                    <td>{this.renderCell(25)}</td>
                    <td>{this.renderCell(26)}</td>
                </tr>
                <tr className='board-row'>
                    <td>{this.renderCell(27)}</td>
                    <td>{this.renderCell(28)}</td>
                    <td>{this.renderCell(29)}</td>
                    <td>{this.renderCell(30)}</td>
                    <td>{this.renderCell(31)}</td>
                    <td>{this.renderCell(32)}</td>
                    <td>{this.renderCell(33)}</td>
                    <td>{this.renderCell(34)}</td>
                    <td>{this.renderCell(35)}</td>
                </tr>
                <tr className='board-row'>
                    <td>{this.renderCell(36)}</td>
                    <td>{this.renderCell(37)}</td>
                    <td>{this.renderCell(38)}</td>
                    <td>{this.renderCell(39)}</td>
                    <td>{this.renderCell(40)}</td>
                    <td>{this.renderCell(41)}</td>
                    <td>{this.renderCell(42)}</td>
                    <td>{this.renderCell(43)}</td>
                    <td>{this.renderCell(44)}</td>
                </tr>
                <tr className='board-row'>
                    <td>{this.renderCell(45)}</td>
                    <td>{this.renderCell(46)}</td>
                    <td>{this.renderCell(47)}</td>
                    <td>{this.renderCell(48)}</td>
                    <td>{this.renderCell(49)}</td>
                    <td>{this.renderCell(50)}</td>
                    <td>{this.renderCell(51)}</td>
                    <td>{this.renderCell(52)}</td>
                    <td>{this.renderCell(53)}</td>
                </tr>
                <tr className='board-row'>
                    <td>{this.renderCell(54)}</td>
                    <td>{this.renderCell(55)}</td>
                    <td>{this.renderCell(56)}</td>
                    <td>{this.renderCell(57)}</td>
                    <td>{this.renderCell(58)}</td>
                    <td>{this.renderCell(59)}</td>
                    <td>{this.renderCell(60)}</td>
                    <td>{this.renderCell(61)}</td>
                    <td>{this.renderCell(62)}</td>
                </tr>
                <tr className='board-row'>
                    <td>{this.renderCell(63)}</td>
                    <td>{this.renderCell(64)}</td>
                    <td>{this.renderCell(65)}</td>
                    <td>{this.renderCell(66)}</td>
                    <td>{this.renderCell(67)}</td>
                    <td>{this.renderCell(68)}</td>
                    <td>{this.renderCell(69)}</td>
                    <td>{this.renderCell(70)}</td>
                    <td>{this.renderCell(71)}</td>
                </tr>
                <tr className='board-row'>
                    <td>{this.renderCell(72)}</td>
                    <td>{this.renderCell(73)}</td>
                    <td>{this.renderCell(74)}</td>
                    <td>{this.renderCell(75)}</td>
                    <td>{this.renderCell(76)}</td>
                    <td>{this.renderCell(77)}</td>
                    <td>{this.renderCell(78)}</td>
                    <td>{this.renderCell(79)}</td>
                    <td>{this.renderCell(80)}</td>
                </tr>
            </tbody>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                cells: PUZZLE,
            }],
            stepNumber: 0,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const cells = current.cells.slice();
        if (calculateWinner(cells) || (cells[i] && cells[i] == PUZZLE[i])) {
            return;
        }
        cells[i] = i;
        this.setState({
            history: history.concat([
                {
                    cells: cells
                }
            ]),
            stepNumber: history.length,
        });
    }

    solveMost() {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const cells = current.cells.slice();

        cells[0] = null;
        for (let i = 1; i < SOLUTION.length; i++) {
            cells[i] = SOLUTION[i];
        }
        this.setState({
            history: history.concat([
                {
                    cells: cells
                }
            ]),
            stepNumber: history.length,
        })
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
        });
    }

    render() {
        const history = this.state.history;
        const currentMove = this.state.stepNumber;
        const current = history[currentMove];
        const winner = calculateWinner(current.cells);

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            const cur = currentMove == move ?
                ' (current)' :
                '';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}{cur}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = winner;
        } else {
            status = <div><button className="solve" onClick={() => this.solveMost()}>Solve most of the Puzzle
                          </button><br></br>Not Solved...
                    </div>
        }

        return (
            <div className="game">
                <table className="game-board">
                    <Board
                        cells={current.cells}
                        onClick={(i) => this.handleClick(i)}
                    />
                </table>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function calculateWinner(cells) {
    for (let i = 0; i < cells.length; i++) {
        if (cells[i] !== SOLUTION[i]) {
            return null;
        }
    }
    return "You win!";
}