import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateProperty.js"

const dino = document.querySelector('[data-dino]')
const JUMP_SPEED = 0.45
const GRAVITY = 0.0015
const DINO_FRAME = 2
const FRAME_TIME = 100

let currentFrameTime
let isJumping
let dinoFrame
let yVelo
export function updateDino(delta, speedScale) {
    handleRun(delta, speedScale)
    handleJump(delta)
}

export function setupDino() {
    isJumping = false
    dinoFrame = 0
    currentFrameTime = 0
    yVelo = 0
    setCustomProperty(dino, '--bottom', 0)
    document.removeEventListener('keydown', onJump)
    document.addEventListener('keydown', onJump)
}

export function setDinoLose() {
    dino.src = "images/dino-lose.png"
}

export function getDinoRect() {
    return dino.getBoundingClientRect()
}


const handleRun = (delta, speedScale) => {
    if (isJumping) {
        dino.src = './images/dino-stationary.png'
        return
    }

    if (currentFrameTime >= FRAME_TIME) {
        dinoFrame = (dinoFrame + 1) % DINO_FRAME
        dino.src = `./images/dino-run-${dinoFrame}.png`
        currentFrameTime -= FRAME_TIME
    }
    currentFrameTime += delta * speedScale

}

const handleJump = (delta) => {
    if (!isJumping) return

    incrementCustomProperty(dino, '--bottom', yVelo * delta)

    if (getCustomProperty(dino, '--bottom') <= 0) {
        setCustomProperty(dino, '--bottom', 0)
        isJumping = false
    }

    yVelo -= GRAVITY * delta
}

const onJump = (e) => {
    if (e.code !== 'Space' || isJumping) return

    yVelo = JUMP_SPEED
    isJumping = true
}