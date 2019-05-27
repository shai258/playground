const Board = require('./Board')

describe('Board ctor', () => {
  test('should initialize a 10 by 10 board', () => {
    const BOARD_SIZE = 10
    const board = new Board(BOARD_SIZE)
  
    const emptyBoard = Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill(0))
  
    expect(board.board).toEqual(emptyBoard)
  })

  test('should initialize a 2 by 2 board', () => {
    const BOARD_SIZE = 2
    const board = new Board(BOARD_SIZE)
  
    const emptyBoard = Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill(0))
  
    expect(board.board).toEqual(emptyBoard)
  })

  test('should return undefined for empty ctor', () => {
    const board = new Board()
  
    expect(board.board).toBe(undefined)
  })


  test('should throw an exception for a string value in the ctor', () => {      
    expect(() => {
      const board = new Board("hi")
    }).toThrow()
  })

})

describe('Board checkPosition() - empty:',() => {
  let emptyBoard;

  beforeAll(() => {
    const BOARD_SIZE = 10    
    emptyBoard = new Board(BOARD_SIZE)
  })

  test('should return true for a size 3 ship in an empty board',() => {
    expect(emptyBoard.checkPosition(2,2,3,'h')).toBe(true)
  })

  test('should return true for a size 1 ship in an empty board',() => {
    expect(emptyBoard.checkPosition(2,2,1,'h')).toBe(true)
  })

  test('should return false for a vertical out of bounds ship',() => {
    expect(emptyBoard.checkPosition(9,9,4,'v')).toBe(false)
  })

  test('should return false for a horizontal out of bounds ship',() => {
    expect(emptyBoard.checkPosition(9,0,3,'h')).toBe(false)
  })

  test('should return true for a edge placed ship',() => {
    expect(emptyBoard.checkPosition(0,0,3,'v')).toBe(true)
  })

  test('should return false for a negative x',() => {
    expect(emptyBoard.checkPosition(-2,0,3,'v')).toBe(false)
  })

  test('should return false for a negative y',() => {
    expect(emptyBoard.checkPosition(0,-1,3,'v')).toBe(false)
  })
  
})

describe('Board checkPosition() - full', () => {
  let fullBoard = new Board();

  beforeAll(() => {
  let board = [[0,0,0,0,0,0,0,0,0,0],
               [0,1,0,0,0,0,0,0,0,0],
               [0,1,0,0,0,0,0,0,0,0],
               [0,1,0,0,0,0,0,0,0,0],
               [0,0,0,0,0,0,0,1,0,0],
               [0,0,1,1,0,0,0,0,0,0],
               [0,0,0,0,0,0,0,0,0,0],
               [0,0,0,1,1,1,0,0,0,0],
               [0,0,0,0,0,0,0,0,0,0],
               [0,0,0,1,1,1,1,0,0,0]]
  fullBoard.board = board
  })
  
  

  test('should return false for a ship positioned on another ship', () => {
    expect(fullBoard.checkPosition(0,1,3,'h')).toBe(false)
  })

  test('should return false for a ship positioned on another ship', () => {
    expect(fullBoard.checkPosition(0,1,3,'h')).toBe(false)
  })

  test('should return false for a horizontal ship positioned near another ship', () => {
    expect(fullBoard.checkPosition(2,3,3,'h')).toBe(false)
  })

  test('should return false for a vertical ship positioned near another ship', () => {
    expect(fullBoard.checkPosition(6,6,2,'v')).toBe(false)
  })

  test('should return true for a leagally positioned ship', () => {
    expect(fullBoard.checkPosition(5,2,2,'v')).toBe(true)
  })

  test('should return true for a leagally positioned ship sized 1', () => {
    expect(fullBoard.checkPosition(9,9,1,'v')).toBe(true)
  })

})