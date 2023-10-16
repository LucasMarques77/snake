const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const finalScore = document.getElementById('final-score')
const menu = document.getElementById('menu')
const buttonPlay = document.getElementById('btn-play')
const canvascore = document.getElementById('canvascore')
// Mutable state
let state = initialState()

// Position helpers
const x = c => Math.round(c * canvas.width / state.cols)
const y = r => Math.round(r * canvas.height / state.rows)

// Game loop draw
const draw = () => {
  // background
  ctx.fillStyle = '#182b1b'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // draw snake
  ctx.fillStyle = '#0d701e'
  state.snake.map(p => ctx.fillRect(x(p.x), y(p.y), x(1), y(1)))

  // draw apples
  ctx.fillStyle = '#c20619'
  ctx.fillRect(x(state.apple.x), y(state.apple.y), x(1), y(1))
  ctx.fillRect(x(state.apple2.x), y(state.apple2.y), x(1), y(1))
  ctx.fillRect(x(state.apple3.x), y(state.apple3.y), x(1), y(1))
  ctx.fillRect(x(state.apple4.x), y(state.apple4.y), x(1), y(1))
  ctx.fillRect(x(state.apple5.x), y(state.apple5.y), x(1), y(1))
  ctx.fillRect(x(state.apple6.x), y(state.apple6.y), x(1), y(1))
  ctx.fillRect(x(state.apple7.x), y(state.apple7.y), x(1), y(1))
  ctx.fillRect(x(state.apple8.x), y(state.apple8.y), x(1), y(1))
  ctx.fillRect(x(state.apple9.x), y(state.apple9.y), x(1), y(1))
  ctx.fillRect(x(state.apple10.x), y(state.apple10.y), x(1), y(1))
  
  // draw mouse
  ctx.fillStyle = '#5f615f'
  ctx.fillRect(x(state.mouse.x), y(state.mouse.y), x(1), y(1))

  // add crash
  if (state.snake.length == 0) {
    ctx.fillStyle = 'rgba(0,0,0,0)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  // edits the score value in HTML
  document.getElementById('score').innerHTML = state.score

}

// Game loop update
const step = timestamp1 => timestamp2 => {
  if (state.pause) {
    window.requestAnimationFrame(step(timestamp1))
  }
  else if (timestamp2 - timestamp1 > 150) {
    state = next(state)
    draw()
    window.requestAnimationFrame(step(timestamp2))
  } else if (state.over) {
    window.requestAnimationFrame(step(timestamp1))
    menu.style.display = "flex"
    finalScore.innerText = score.innerText
    canvascore.style.filter = "blur(20px)"
  } else {
    window.requestAnimationFrame(step(timestamp1))
  }
}
// Key events
window.addEventListener('keydown', e => {
  switch (e.key) {
    case 'w': case 'h': case 'ArrowUp':    state = enqueue(state, NORTH); state.pause = false; clickbtn(); vanish(); break
    case 's': case 'k': case 'ArrowDown':  state = enqueue(state, SOUTH); state.pause = false; clickbtn(); vanish(); break
    case 'a': case 'j': case 'ArrowLeft':  state = enqueue(state, WEST);  state.pause = false; clickbtn(); vanish(); break
    case 'd': case 'l': case 'ArrowRight': state = enqueue(state, EAST);  state.pause = false; clickbtn(); vanish(); break
    case 'p': state.pause = !state.pause;  clickbtn(); vanish(); break
  }
})
//function for html button making the game over screen go away
const clickbtn = () => {
  menu.style.display = "none"
  canvascore.style.filter = "none"
}
//vanish makes h1 and h4 in html just gone
const vanish = () => {
  document.getElementById('tit1').innerHTML = ''
  document.getElementById('tit2').innerHTML = ''
}
// Main
draw(); window.requestAnimationFrame(step(0))
