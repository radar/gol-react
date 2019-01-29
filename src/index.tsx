import React, { Component } from 'react';
import { render } from 'react-dom';
import Rect from './Rect'
import Engine, {Cell} from './Engine';
import './style.css';

const CELL_SIZE = 8;

class App extends Component {
  state = {
    started: false,
    interval: 0,
    generation: 0,
    cells: [
      new Cell(0, 0),
      new Cell(-1, 0),
      new Cell(1, 0),

      new Cell(-1, -1),
      new Cell(-1, -2),

      new Cell(1, -1),
      new Cell(1, -2),

    ],
  }

  getRandomColor() {
    // var letters = '0123456789ABCDEF';
    // var color = '#';
    // for (var i = 0; i < 6; i++) {
    //   color += letters[Math.floor(Math.random() * 16)];
    // }
    return "#ee0000";
    // return color;
  }

  stop = () => {
    clearInterval(this.state.interval);
    this.setState({interval: null, started: false})
  }

  start = () => {
    if (!this.state.started) {
      const intervalId = setInterval(this.tick, 50)
      this.setState({started: true, interval: intervalId})
    }
  }


  tick = () => {
    const {cells, generation} = this.state;
    const engine = new Engine(cells)
    const newCells = engine.tick()
    this.setState({ cells: newCells, generation: generation + 1 })

    if (newCells.length == 0) {
      this.stop()
      return
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.start}>Start</button>
        <button onClick={this.stop}>Stop</button>
        {/* <button onClick={this.tick}>Tick!</button> */}
        <p>
          Generation: {this.state.generation}
        </p>
        <svg viewBox="-500 -250 1000 1000" xmlns="http://www.w3.org/2000/svg">
          {this.renderVerticalLines()}
          {this.renderHorizontalLines()}
          {this.renderCells()}
        </svg>
      </div>
    );
  }

  inclusiveRange (start: number, end: number, step: number) {
    return Array.from(Array.from(Array(Math.ceil((end-start+1)/step)).keys()), x => start+ x*step);
  }

  renderVerticalLines() {
    return this.inclusiveRange(-500, 100, 1).map(x => {
      return <line x1={CELL_SIZE * x} y1={-250} x2={CELL_SIZE * x} y2={1000} stroke="#dedede" />
    })

  }

  renderHorizontalLines() {
    return this.inclusiveRange(-50, 100, 1).map(x => {
      return <line x1={-500} y1={CELL_SIZE * x} x2={1000} y2={CELL_SIZE * x} stroke="#dedede" />
    })

  }

  renderCells = () => {
    const color = this.getRandomColor()
    return this.state.cells.map((cell, i) => <Rect {...cell} color={color} size={CELL_SIZE} key={i} />)
  }
}

render(<App />, document.getElementById('root'));
