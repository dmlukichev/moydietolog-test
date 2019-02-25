import './Field.css'
import * as React from 'react'
import classNames from 'classnames'
import { observer } from 'mobx-react'
import Cell from '../store/Cell'

export interface IFieldProps {
    width: number
    height: number
    cells: Array<Array<Cell>>
}

export const Field = observer((props: IFieldProps) => (
    <div id='field' style={{
        width: 70 * props.width,
        height: 70 * props.height
    }}>
        {props.cells.map((line) =>
            line.map((cell) => (
                <div
                    className={classNames(
                        'cell',
                        cell.ground ? 'cell-ground' : '',
                        cell.water ? 'cell-water' : '',
                    )}
                    key={`${cell.x}:${cell.y}`}
                    onClick={() => cell.toggleFilled()}
                />
            ))
        )}
    </div>
))

export default Field