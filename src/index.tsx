import React from 'react'
import { render } from 'react-dom'

import { StoreContext } from 'adapters/primary/contexts/index'
import stores from 'domain/stores/index'

const Main: React.FC = () => {
    return (
        <React.StrictMode>
            <StoreContext.Provider value={stores}>
                <div>Loft-Traveler</div>
            </StoreContext.Provider>
        </React.StrictMode>
    )
}

render(<Main />, document.getElementById('root'))
