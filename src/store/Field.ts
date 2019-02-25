import { action, observable } from 'mobx'
import range from 'lodash/range'
import Cell from './Cell'

export class Field {
    @observable width: number
    @observable height: number
    @observable watered: boolean = false
    @observable cells: Array<Array<Cell>> = []

    constructor(width: number, height: number) {
        this.width = width
        this.height = height

        this.init()
    }

    @action init() {
        this.watered = false
        this.cells = range(0, this.height).map((y) =>
            range(0, this.width).map((x) =>
                new Cell(this, x, y )
            )
        )
    }

    @action toggleWatered() {
        if (this.watered) {
            this.watered = false
            this.cells.forEach(line =>
                line.forEach(cell => cell.water = false)
            )
            return
        }

        this.watered = true

        for (let y = this.height - 1; y >= 0; y--) {
            const line = this.cells[y]
            for (let x = 1; x < this.width-1; x++) {
                const cell = this.cells[y][x]
                const left = line[cell.x - 1]

                if (cell.ground || !left) {
                    continue
                }

                if (!left.ground && !left.water) {
                    continue
                }


                if (cell.bottom && !cell.bottom.ground && !cell.bottom.water) {
                    continue
                }

                let right = cell
                let leaked = false
                do {
                    right = line[right.x+1]

                    if (!right.bottom) { continue } // tshint

                    leaked = !right.bottom.ground && !right.bottom.water
                } while (!right.ground && !leaked && right.x < this.width - 1)

                if (!leaked && right.ground) {
                    range(cell.x, right.x).forEach((x) =>
                        line[x].water = true
                    )
                    x = right.x
                }
            }
        }
    }
}

export default Field