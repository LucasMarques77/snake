const base = require('./base')
Object.getOwnPropertyNames(base).map(p => global[p] = base[p])


// Constants
const NORTH = { x: 0, y:-1 }
const SOUTH = { x: 0, y: 1 }
const EAST  = { x: 1, y: 0 }
const WEST  = { x:-1, y: 0 }

// Point operations
const pointEq = p1 => p2 => p1.x == p2.x && p1.y == p2.y

// Booleans
const willEat   = state => pointEq(nextHead(state))(state.apple)
const willEat2   = state => pointEq(nextHead(state))(state.mouse)
const willCrash = state => state.snake.find(pointEq(nextHead(state)))
const validMove = move => state =>
  state.moves[0].x + move.x != 0 || state.moves[0].y + move.y != 0

// Next values based on state
const nextMoves = state => state.moves.length > 1 ? dropFirst(state.moves) : state.moves
const nextApple = state => willEat(state) ? rndPos(state) : state.apple
const nextmouse = state => willEat2(state) ? rndPos(state) : state.mouse
const nextHead  = state => state.snake.length == 0
  ? { x: 2, y: 2 }
  : {
    x: mod(state.cols)(state.snake[0].x + state.moves[0].x),
    y: mod(state.rows)(state.snake[0].y + state.moves[0].y)
  }
//if the snake eats the mouse it gets bigger and if she eats the apple she dies
const nextSnake2 = state => {
  if (willCrash(state)) {
    return[];
  } else {
    if (willEat2(state)) {
      return [nextHead(state)].concat(state.snake);
    } else if (willEat2(state)) {
      return [nextHead(state)].concat(dropLast(state.snake));
    } else if (willEat(state)) {
      return []
    } else  {
      return [nextHead(state)].concat(dropLast(state.snake));
  }
  }
}
// Randomness
const rndPos = table => ({
  x: rnd(0)(table.cols - 1),
  y: rnd(0)(table.rows - 1)
})

// Initial state
const initialState = () => ({
  cols:  20,
  rows:  14,
  moves: [EAST],
  snake: [],
  apple: { x: 16, y: 2 },
  mouse: { x: 10, y: 3 },
})

const next = spec({
  rows:  prop('rows'),
  cols:  prop('cols'),
  moves: nextMoves,
  snake: nextSnake2,
  apple: nextApple,
  mouse: nextmouse
})

const enqueue = (state, move) => validMove(move)(state)
  ? merge(state)({ moves: state.moves.concat([move]) })
  : state

module.exports = { EAST, NORTH, SOUTH, WEST, initialState, enqueue, next, }
