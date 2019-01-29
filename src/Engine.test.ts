import Engine, {Cell} from './Engine'

describe('Rule 1: Any live cell with fewer than two live neighbors dies, as if by underpopulation.', () => {

  test('a single cell with no neighbour', () => {
    const cell = new Cell(0, 1)
    const engine = new Engine([
      cell
    ])
    engine.rule1()
    expect(cell.dying).toBeTruthy()
  })

  test('a cell with two neighbours', () => {
    const cell_1 = new Cell(0, 0)
    const cell_2 = new Cell(0, 1)
    const cell_3 = new Cell(0, -1)
    const engine = new Engine([
      cell_1,
      cell_2,
      cell_3
    ])
    engine.rule1()
    expect(cell_1.dying).toBeFalsy()
    expect(cell_2.dying).toBeTruthy()
    expect(cell_3.dying).toBeTruthy()
  })
})

describe('Rule 2: Any live cell with two or three live neighbors lives on to the next generation.', () => {
  test('a cell with two neighbours', () => {
    const cell_1 = new Cell(0, 0)
    const cell_2 = new Cell(0, 1)
    const cell_3 = new Cell(0, -1)
    const engine = new Engine([
      cell_1,
      cell_2,
      cell_3
    ])
    engine.rule2()
    expect(cell_1.dying).toBeFalsy()
    expect(cell_2.dying).toBeTruthy()
    expect(cell_3.dying).toBeTruthy()
  })

  test('a cell with three neighbours', () => {
    const cell_1 = new Cell(0, 0)
    const cell_2 = new Cell(0, 1)
    const cell_3 = new Cell(1, 1)
    const cell_4 = new Cell(0, -1)
    const engine = new Engine([
      cell_1,
      cell_2,
      cell_3,
      cell_4
    ])
    engine.rule2()
    expect(cell_1.dying).toBeFalsy()
    expect(cell_2.dying).toBeFalsy()
    expect(cell_3.dying).toBeFalsy()
    expect(cell_4.dying).toBeTruthy()
  })
})

describe('Rule 3: Any live cell with more than three live neighbors dies, as if by overpopulation.', () => {
  test('a cell with four neighbours', () => {
    const cell_1 = new Cell(0, 0)
    const cell_2 = new Cell(0, 1)
    const cell_3 = new Cell(0, -1)
    const cell_4 = new Cell(-1, 0)
    const cell_5 = new Cell(-1, -1)
    const engine = new Engine([
      cell_1,
      cell_2,
      cell_3,
      cell_4,
      cell_5
    ])
    engine.rule3()
    expect(cell_1.dying).toBeTruthy()
  })

  test('a cell with three neighbours', () => {
    const cell_1 = new Cell(0, 0)
    const cell_2 = new Cell(0, 1)
    const cell_3 = new Cell(1, 1)
    const cell_4 = new Cell(0, -1)
    const engine = new Engine([
      cell_1,
      cell_2,
      cell_3,
      cell_4
    ])
    engine.rule1()
    expect(cell_1.dying).toBeFalsy()
    expect(cell_2.dying).toBeFalsy()
    expect(cell_3.dying).toBeFalsy()
    expect(cell_4.dying).toBeTruthy()
  })
})

describe('Rule 4: Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.', () => {
  test('a cell with three live neighbours', () => {
    const cell_1 = new Cell(-1, 0)
    const cell_2 = new Cell(0, 0)
    const cell_3 = new Cell(1, 0)
    const engine = new Engine([
      cell_1,
      cell_2,
      cell_3,
    ])
    engine.rule4()
    expect(engine.cellAt(0, -1)).not.toBeUndefined()
  })

  test('does not create cells where there are cells already', () => {
    const cell_0 = new Cell(0, 0)
    const cell_1 = new Cell(0, 1)
    const cell_2 = new Cell(0, -1)
    const cell_3 = new Cell(-1, 0)
    const engine = new Engine([
      cell_0,
      cell_1,
      cell_2,
      cell_3,
    ])
    engine.rule4()
    let cells = engine.cells.filter(({x, y}) => x == 0 && y == 0)
    expect(cells.length).toEqual(1)
  })
})


describe('cellAt', () => {
  test('finds a given cell', () => {
    const cell = new Cell(0, 0)
    const engine = new Engine([
      cell
    ])

    expect(engine.cellAt(0, 0)).toEqual(cell)
  })
})

describe('neighbours', () => {
  test('counts neigbouring cells', () => {
    const cell_1 = new Cell(0, 0)
    const cell_2 = new Cell(0, 1)
    const cell_3 = new Cell(0, -1)
    const cell_4 = new Cell(-1, 0)
    const cell_5 = new Cell(-1, 1)
    const cell_6 = new Cell(-1, -1)
    const cell_7 = new Cell(1, 0)
    const cell_8 = new Cell(1, 1)
    const cell_9 = new Cell(1, -1)
    const engine = new Engine([
      cell_1,
      cell_2,
      cell_3,
      cell_4,
      cell_5,
      cell_6,
      cell_7,
      cell_8,
      cell_9,
    ])

    expect(engine.neighbours(cell_1)).toEqual(8.)
  })
})

describe('glider', () => {
  test('moves correctly: phase 1', () => {
    let cells = [
      new Cell(0, 0),
      new Cell(-1, 0),
      new Cell(1, 0),
      new Cell(1, 1),
      new Cell(0, 2),
    ]
    const engine = new Engine(cells)

    const newCells = engine.tick()
    expect(newCells).toContainEqual(new Cell(-1, 1))
    expect(newCells).toContainEqual(new Cell(0, 0))
    expect(newCells).toContainEqual(new Cell(1, 0))
    expect(newCells).toContainEqual(new Cell(1, 1))
    expect(newCells).toContainEqual(new Cell(0, -1))
  })

  test('moves correctly: phase 2', () => {
    let cells = [
      new Cell(1, -2),
      new Cell(2, -2),
      new Cell(3, -2),
      new Cell(3, -1),
      new Cell(2, 0),

    ]
    const engine = new Engine(cells)

    const newCells = engine.tick()

    expect(newCells).toContainEqual(new Cell(1, -1))
    expect(newCells).toContainEqual(new Cell(2, -3))
  })
})
