import { incrementCustomProperty, setCustomProperty, getCustomProperty } from "./updateProperty.js"

const groundEle = document.querySelectorAll('[data-ground]')
const SPEED = 0.05

export function setupGround() {
    setCustomProperty(groundEle[0], '--left', 0)
    setCustomProperty(groundEle[1], '--left', 300)
}

export function updateGround(delta, speedScale) {
    groundEle.forEach(ground => {
        incrementCustomProperty(ground, '--left', delta * speedScale * SPEED * -1)

        if (getCustomProperty(ground, '--left') <= -300) {
            incrementCustomProperty(ground, '--left', 600)
        }
    })
}