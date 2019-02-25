import React from 'react'
import ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'
import range from 'lodash/range'
import Field from './Field'

let container: HTMLElement

beforeEach(async () => {
    container = document.createElement('div')
    document.body.appendChild(container)
})

afterEach(() => {
    document.body.removeChild(container)
    container = null
})

it('Field component', () => {
    const cells = range(0, 10).map(y =>
        range(0, 50).map(x =>
            ({ x, y } as any)
        )
    )

    act(() => {
        ReactDOM.render((
            <Field
                width={50}
                height={10}
                cells={cells}
            />
        ), container)
    })

    expect(container.querySelectorAll('.cell').length).toEqual(500)
})