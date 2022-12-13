import { updateGround, setupGround } from './ground.js'
import { updateDino, setupDino, getDinoRect, setDinoLose } from './dino.js'
import { updateCactus, setupCactus, getCactusRect } from './cactus.js'

const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;
const SPEED_SCALE_INCREASE = 0.00001

const worldEle = document.querySelector("[data-world]");
const scoreEle = document.querySelector('[data-score]')
const startScreenEle = document.querySelector('[data-start-screen]')

let lastTime
let speedScale
let score

const updateLoop = (time) => {
    if (lastTime == null) {
        lastTime = time
        window.requestAnimationFrame(updateLoop)
        return
    }
    const delta = time - lastTime
    updateGround(delta, speedScale)
    updateDino(delta, speedScale)
    updateCactus(delta, speedScale)
    updateSpeedScale(delta)
    updateScore(delta)
    if (checkLose()) return handleLose()

    lastTime = time
    window.requestAnimationFrame(updateLoop)
}

const checkLose = () => {
    const dinoRect = getDinoRect()
    return getCactusRect().some(rect => isCollision(rect, dinoRect))
}

function isCollision(rect1, rect2) {
    return (
        rect1.left < rect2.right &&
        rect1.top < rect2.bottom &&
        rect1.right > rect2.left &&
        rect1.bottom > rect2.top
    )
}

const updateScore = (delta) => {
    score += delta * 0.1
    scoreEle.innerText = Math.floor(score)
}

const updateSpeedScale = (delta) => {
    speedScale += SPEED_SCALE_INCREASE
}

const handleStart = () => {
    lastTime = null
    speedScale = 1
    score = 0
    startScreenEle.classList.add('hide')
    setupGround()
    setupDino()
    setupCactus()
    window.requestAnimationFrame(updateLoop)
}

const handleLose = () => {
    setDinoLose()
    setTimeout(() => {
        document.addEventListener('keydown', handleStart, { once: true })
        startScreenEle.classList.remove('hide')
    }, 100)

}

const setpixletoworld = () => {
    let worldScale;
    if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
        worldScale = window.innerWidth / WORLD_WIDTH
    } else {
        worldScale = window.innerHeight / WORLD_HEIGHT
    }

    worldEle.style.width = `${WORLD_WIDTH * worldScale}px`
    worldEle.style.height = `${WORLD_HEIGHT * worldScale}px`
};

setupGround()

setpixletoworld();

window.addEventListener("resize", setpixletoworld);

document.addEventListener('keydown', handleStart, { once: true })
