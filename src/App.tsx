import React, { Component } from 'react'
import './App.css'
import { FIELD_WIDTH, FIELD_HEIGHT } from './config'
import FieldView from './components/Field'
import FieldStore from './store/Field'
import { observer } from 'mobx-react'

@observer
class App extends Component {
    field: FieldStore

    constructor(props: any) {
        super(props)

        this.field = new FieldStore(FIELD_WIDTH, FIELD_HEIGHT)
    }

    render() {
        return (
            <>
                <h3>Тестовое задание</h3>
                <div className='wrapper'>
                    <FieldView
                        width={FIELD_WIDTH}
                        height={FIELD_HEIGHT}
                        cells={this.field.cells}
                    />

                    <div className='action-buttons'>
                        <button
                            className='reset'
                            onClick={()=> this.field.init()}
                        >
                            Reset
                        </button>

                        <button
                            className='run'
                            onClick={() => this.field.toggleWatered()}
                        >
                            Run
                        </button>
                    </div>
                </div>
            </>
        )
    }
}

export default App
