const base = require('./base')
Object.getOwnPropertyNames(base).map(p => global[p] = base[p])

// Constants
const NORTH = { x: 0, y:-1 }
const SOUTH = { x: 0, y: 1 }
const EAST  = { x: 1, y: 0 }
const WEST  = { x:-1, y: 0 }
const NONE  = { x: 0, y: 0 }

// Point operations
const pointEq = p1 => p2 => p1.x == p2.x && p1.y == p2.y

// Booleans
const willEat   = state => pointEq(nextHead(state))(state.apple)
const willEat2   = state => pointEq(nextHead(state))(state.apple2)
const willEat3   = state => pointEq(nextHead(state))(state.apple3)
const willEat4   = state => pointEq(nextHead(state))(state.apple4)
const willEat5  = state => pointEq(nextHead(state))(state.apple5)
const willEat6  = state => pointEq(nextHead(state))(state.apple6)
const willEat7   = state => pointEq(nextHead(state))(state.apple7)
const willEat8  = state => pointEq(nextHead(state))(state.apple8)
const willEat9 = state => pointEq(nextHead(state))(state.apple9)
const willEat10   = state => pointEq(nextHead(state))(state.apple10)

const willEatMouse   = state => pointEq(nextHead(state))(state.mouse)

const willCrash = state => state.snake.find(pointEq(nextHead(state)))

const validMove = move => state =>  
  state.moves[0].x + move.x != 0 || state.moves[0].y + move.y != 0

// Next values based on state
const nextMoves = state => state.moves.length > 1 ? dropFirst(state.moves) : state.moves
const nextApple = state => {
  if (willEat(state)) {
    return rndPos(state);
  } else if (willEatMouse(state)){
    return rndPos(state);
  } else {
    return state.apple;
  }
}
const nextApple2 = state => {
  if (willEat2(state)) {
    return rndPos(state);
  } else if (willEatMouse(state)){
    return rndPos(state);
  } else {
    return state.apple2;
  }
}
const nextApple3 = state => {
  if (willEat3(state)) {
    return rndPos(state);
  } else if (willEatMouse(state)){
    return rndPos(state);
  } else {
    return state.apple3;
  }
}
const nextApple4 = state => {
  if (willEat4(state)) {
    return rndPos(state);
  } else if (willEatMouse(state)){
    return rndPos(state);
  } else {
    return state.apple4;
  }
}
const nextApple5 = state => {
  if (willEat5(state)) {
    return rndPos(state);
  } else if (willEatMouse(state)){
    return rndPos(state);
  } else {
    return state.apple5;
  }
}
const nextApple6 = state => {
  if (willEat6(state)) {
    return rndPos(state);
  } else if (willEatMouse(state)){
    return rndPos(state);
  } else {
    return state.apple6;
  }
}
const nextApple7 = state => {
  if (willEat7(state)) {
    return rndPos(state);
  } else if (willEatMouse(state)){
    return rndPos(state);
  } else {
    return state.apple7;
  }
}
const nextApple8 = state => {
  if (willEat8(state)) {
    return rndPos(state);
  } else if (willEatMouse(state)){
    return rndPos(state);
  } else {
    return state.apple8;
  }
}
const nextApple9 = state => {
  if (willEat9(state)) {
    return rndPos(state);
  } else if (willEatMouse(state)){
    return rndPos(state);
  } else {
    return state.apple9;
  }
}
const nextApple10 = state => {
  if (willEat10(state)) {
    return rndPos(state);
  } else if (willEatMouse(state)){
    return rndPos(state);
  } else {
    return state.apple10;
  }
}
const nextMouse = state => willEatMouse(state) ? rndPos(state) : state.mouse
const nextHead  = state => state.snake.length == 0
  ? { x: 2, y: 2 }
  : {
    x: mod(state.cols)(state.snake[0].x + state.moves[0].x),
    y: mod(state.rows)(state.snake[0].y + state.moves[0].y)
  }

const nextSnake2 = state => {
  if (willCrash(state)) {
    return[];
  } else {
    if (willEatMouse(state)) {
      return [nextHead(state)].concat(state.snake);
    } else if (willEat(state)) {

      return []
    } else if (willEat2(state)) {

      return []
    } else if (willEat3(state)) {

      return []
    } else if (willEat4(state)) {

      return [] 
    } else if (willEat5(state)) {

      return []
    } else if (willEat6(state)) {

      return []
    } else if (willEat7(state)) {

      return []
    } else if (willEat8(state)) {

      return []
    } else if (willEat9(state)) {

      return []
    } else if (willEat10(state)) {

      return [] 
    } else {
      return [nextHead(state)].concat(dropLast(state.snake));
    }
  }
}

// Randomness
const rndPos = table => ({
  x: rnd(0)(table.cols - 1),
  y: rnd(0)(table.rows - 1)
})
const nextScore = state => {
  if (state.snake.length == 0) {
    return 0
  }
  else if (willEatMouse(state)) {
    return (state.score + 1)
  }
  else {
    return state.score
  }
}

const nextPause = state => {
  if (state.snake.length == 0) {
    return true
  }
  else
    return state.pause
}

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
  snake: nextSnake,
  apple: nextApple,
  mouse: nextMouse
})

const enqueue = (state, move) => validMove(move)(state)
  ? merge(state)({ moves: state.moves.concat([move]) })
  : state

module.exports = { EAST, NORTH, SOUTH, WEST, initialState, enqueue, next, }
