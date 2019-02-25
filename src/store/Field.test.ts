import Field from './Field'
import trim from 'cool-trim'
import { action } from 'mobx'
import Cell from './Cell'

class TestableField extends Field {
    @action initFromSource(source: string) {
        this.cells = source.split('\n').map((line, y) =>
            line.split('').map((char, x) => {
                const cell = new Cell(this, x, y)
                cell.ground = char === '#'
                return cell
            })
        )
    }

    toSource(): string {
        return this.cells
            .map(line =>
                line.map(cell => {
                    if (cell.ground) {
                        return '#'
                    } else if (cell.water) {
                        return '~'
                    } else {
                        return '.'
                    }
                }).join('')
            )
            .join('\n')
    }
}

describe('Field store', () => {
    describe('watering', () => {
        const checkWatering = (input: string, output: string) => {
            const width = input.split('\n')[0].length
            const height = input.split('\n').length

            const field = new TestableField(width, height)
            field.initFromSource(input)
            field.toggleWatered()
            expect(field.toSource()).toEqual(output)
        }

        it('sets water', () => {
            checkWatering(trim(`
                #.#
                #.#
            `), trim(`
                #~#
                #~#
            `))
        })

        it('handles missing borders', () => {
            checkWatering(trim(`
                #....
                #....
                ####.
            `), trim(`
                #....
                #....
                ####.
            `))
        })

        it('works correctly', () => {
            checkWatering(trim(`
                ............
                ............
                ...#.......#
                #.##.#..#..#
                ####.##.####
            `), trim(`
                ............
                ............
                ...#~~~~~~~#
                #~##~#~~#~~#
                ####~##~####
            `))
        })
    })
})