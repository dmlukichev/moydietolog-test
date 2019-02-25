import { action, observable } from 'mobx'
import Field from './Field'

export class Cell {
    field: Field

    x: number
    y: number

    @observable ground: boolean
    @observable water: boolean = false

    constructor(field: Field, x: number, y: number) {
        this.field = field

        this.x = x
        this.y = y
        this.ground = false
    }

    get top() {
        if (this.y === 0) {
            return false
        }

        return this.field.cells[this.y - 1][this.x]
    }

    get bottom() {
        if (this.y === this.field.height - 1) {
            return null
        }

        return this.field.cells[this.y + 1][this.x]
    }

    @action toggleFilled() {
        if (this.field.watered) {
            this.field.toggleWatered()
            return
        }

        if (this.ground && this.top && !this.top.ground) {
            return this.ground = false
        }

        if (!this.ground && (!this.bottom || this.bottom.ground)) {
            return this.ground = true
        }
    }
}

export default Cell
