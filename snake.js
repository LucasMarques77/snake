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

// score
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
//game over function with boolean conditions to return a state for the game over screen
const nextOver = state => {
  if (state.snake.length == 0) {
    return false
  } else if (willEatMouse(state)) {
    return false
  } else if (willCrash(state)) {
    return true
  } else if (willEat(state)) {
    return true
  } else if (willEat2(state)) {
    return true
  } else if (willEat3(state)) {
    return true
  } else if (willEat4(state)) {
    return true
  } else if (willEat5(state)) {
    return true
  } else if (willEat6(state)) {
    return true
  } else if (willEat7(state)) {
    return true
  } else if (willEat8(state)) {
    return true
  } else if (willEat9(state)) {
    return true
  } else if (willEat10(state)) {
    return true
  } else {
    return state.over
  }
}
//pause
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
  moves: [NONE],
  snake: [],
  apple: { x: 16, y: 2 },
  apple2: { x: 2, y: 8 },
  apple3: { x: 6, y: 7 },
  apple4: { x: 10, y: 10 },
  apple5: { x: 8, y: 4 },
  apple6: { x: 14, y: 6 },
  apple7: { x: 9, y: 12 },
  apple8: { x: 11, y: 1 },
  apple9: { x: 17, y: 5 },
  apple10: { x: 1, y: 13 },
  mouse: { x: 10, y: 3 },
  score: 0,
  pause: false,
  over: false
})

const next = spec({
  rows:  prop('rows'),
  cols:  prop('cols'),
  moves: nextMoves,
  snake: nextSnake2,
  apple: nextApple,
  apple2: nextApple2,
  apple3: nextApple3,
  apple4: nextApple4,
  apple5: nextApple5,
  apple6: nextApple6,
  apple7: nextApple7,
  apple8: nextApple8,
  apple9: nextApple9,
  apple10: nextApple10,
  mouse: nextMouse,
  score: nextScore,
  pause: nextPause,
  over: nextOver
  
})

const enqueue = (state, move) => {
  if (validMove(move)(state) & state.moves.length < 3) {
    return merge(state)({ moves: state.moves.concat([move]) }) }
  else {
    return state }
  }
module.exports = { EAST, NORTH, SOUTH, WEST, NONE, initialState, enqueue, next, willCrash, willEatMouse, nextHead, dropLast, willEat, reset2 }
