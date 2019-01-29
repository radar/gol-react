export class Cell {
  x: number
  y: number
  dying: boolean

  constructor(x: number, y: number) {
    this.x = x
    this.y = y

    this.dying = false
  }

  markForDeath() {
    this.dying = true
  }
}

class Engine {
  cells: Cell[]

  constructor(cells: Cell[]) {
    this.cells = cells
  }

  tick() {
    this.rule1()
    this.rule2()
    this.rule3()
    this.rule4()


    return this.cells.filter(cell => !cell.dying)
  }

  rule1 = () => {
    const dyingCells = this.cells.filter(cell => this.neighbours(cell) < 2)
    dyingCells.forEach(cell => cell.markForDeath())
  }

  rule2() { this.rule1() }

  rule3 = () => {
    const dyingCells = this.cells.filter(cell => this.neighbours(cell) > 3)
    dyingCells.forEach(cell => cell.markForDeath())
  }

  rule4 = () => {
    const sortFn = (a: number, b: number) => a - b
    const xCoords = this.cells.map(cell => cell.x).sort(sortFn)
    const yCoords = this.cells.map(cell => cell.y).sort(sortFn)

    const minX = xCoords[0] - 1
    const maxX = xCoords[xCoords.length-1] + 1

    const minY = yCoords[0] - 1
    const maxY = yCoords[yCoords.length-1] + 1

    let newCells: Cell[] = []

    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        let cell = new Cell(x, y)
        if (this.neighbours(cell) == 3 && !this.cellAt(x, y)) {
          newCells = newCells.concat(cell)
        }
      }
    }

    this.cells = this.cells.concat(newCells)
  }

  neighbours = ({x: cell_x, y: cell_y}: Cell): number => {
    const x_coords = [cell_x-1, cell_x, cell_x+1]
    const y_coords = [cell_y-1, cell_y, cell_y+1]

    let neighbours: Cell[] = []

    x_coords.forEach(x => {
      return y_coords.forEach(y => {
        if (x == cell_x && y == cell_y) { return }
        let cell = this.cellAt(x, y)
        if (cell) {
          neighbours = neighbours.concat(cell)
        }
      })
    })

    return neighbours.length
  }

  cellAt = (x: number, y: number) => {
    return this.cells.find(cell => cell.x == x && cell.y == y)
  }
}

export default Engine
