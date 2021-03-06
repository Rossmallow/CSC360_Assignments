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
        <input
            type="text"
            id={"cell" + props.index}
            className={props.className}
            maxLength="1"
            defaultValue={props.defaultValue}
            onChange={() => props.prop.onChange(props.index, document.getElementById("cell" + props.index).value)}
        >
        </input>
    );
}

class Board extends React.Component {
    getClassName(i) {
        let cName = "cell";
        if (PUZZLE[i] !== null) {
            cName += " hintCell";
        }
        if ((i >= 0 && i < 9) || (i >= 27 && i < 36) || (i >= 54 && i < 63)) {
            cName += " top";
        }
        if (i >= 72 && i < 81) {
            cName += " bottom";
        }
        if (i % 3 === 0) {
            cName += " left";
        }
        if ((i + 1) % 9 === 0) {
            cName += " right";
        }
        return cName;
    }

    renderCell(i) {
        return (
            <Cell
                prop={this.props}
                index={i}
                className={this.getClassName(i)}
                defaultValue={this.props.cells[i]}
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

    handleInput(i, val) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const cells = current.cells.slice();

        if (calculateWinner(cells) || (cells[i] && cells[i] === PUZZLE[i])) {
            document.getElementById("cell" + i).value = cells[i];
            return;
        }

        if ((!isNaN(Number(val)) && Number(val) !== 0) || val === "") {
            if (val === "") {
                cells[i] = null;
                document.getElementById("cell" + i).value = "";
            } else {
                cells[i] = Number(val);
                document.getElementById("cell" + i).value = cells[i];
            }

            this.setState({
                history: history.concat([
                    {
                        cells: cells
                    }
                ]),
                stepNumber: history.length,
            });

        } else {
            cells[i] = null;
            document.getElementById("cell" + i).value = "";
        }
    }

    cheat() {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const cells = current.cells.slice();

        let count = 1;
        for (let i = 0; i < SOLUTION.length; i++) {
            if (count && PUZZLE[i] == null) {
                cells[i] = null;
                document.getElementById("cell" + i).placeholder = SOLUTION[i];
                count--;
            } else {
                cells[i] = SOLUTION[i];
                document.getElementById("cell" + i).placeholder = cells[i];
                document.getElementById("cell" + i).value = cells[i];
            }
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
        const history = this.state.history.slice(0, step + 1);
        const current = history[history.length - 1];
        const cells = current.cells.slice();
        console.log(cells);

        for (let i = 0; i < cells.length; i++) {
            if (cells[i] == null) {
                document.getElementById("cell" + i).placeholder = "";
                document.getElementById("cell" + i).value = "";
            } else {
                document.getElementById("cell" + i).placeholder = cells[i];
                document.getElementById("cell" + i).value = cells[i];
            }
        }
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
            const cur = currentMove === move ?
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
            status = <div><button className="solve" onClick={() => this.cheat()}>Cheat
                          </button><br></br>Not Solved...
                    </div>
        }

        return (
            <div className="game">
                <table className="game-board">
                    <Board
                        cells={current.cells}
                        onChange={(i, val) => this.handleInput(i, val)}
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
    const boxes = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
        if (cells[i] !== SOLUTION[i]) {
            for (let i = 0; i < boxes.length; i++) {
                boxes[i].classList.remove("win");
            }
            return null;
        }
    }
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].classList.add("win");
    }
    return "You win!";
}