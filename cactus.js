import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateProperty.js"

const SPEED = 0.05
const CACTUS_MINIMUM_INTERVAL = 500
const CACTUS_MAXIMUM_INTERVAL = 2000
const worldElement = document.querySelector('[data-world]')


let nextCactusTime
export function setupCactus() {
    nextCactusTime = CACTUS_MINIMUM_INTERVAL
    document.querySelectorAll('[data-cactus]').forEach(cactus => {
        cactus.remove()
    })
}

export function updateCactus(delta, speedScale) {
    document.querySelectorAll('[data-cactus]').forEach(cactus => {
        incrementCustomProperty(cactus, '--left', delta * speedScale * SPEED * -1)

        if (getCustomProperty(cactus, '--left') <= -100) {
            cactus.remove()
        }
    });

    if (nextCactusTime <= 0) {
        createCactus()
        nextCactusTime = randomNumberBetween(CACTUS_MINIMUM_INTERVAL, CACTUS_MAXIMUM_INTERVAL) / speedScale
    }

    nextCactusTime -= delta
}

export function getCactusRect() {
    return [...document.querySelectorAll('[data-cactus]')].map(cactus => (
        cactus.getBoundingClientRect()
    ))
}

const createCactus = () => {
    const cactus = document.createElement('img')
    cactus.dataset.cactus = true
    cactus.src = './images/cactus.png'
    cactus.classList.add('cactus')
    setCustomProperty(cactus, '--left', 100)
    worldElement.append(cactus)
}


const randomNumberBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}