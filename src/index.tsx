import React from 'react'
import { render } from 'react-dom'

import { StoreContext } from 'adapters/primary/contexts/index'
import { HomeView } from 'adapters/primary/views/home/homeView'
import stores from 'domain/stores/index'

import './main.scss'

const Main: React.FC = () => {
    return (
        <React.StrictMode>
            <StoreContext.Provider value={stores}>
                <HomeView />
            </StoreContext.Provider>
        </React.StrictMode>
    )
}

render(<Main />, document.getElementById('root'))
