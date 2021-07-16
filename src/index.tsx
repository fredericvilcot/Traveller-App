import React from 'react'
import { render } from 'react-dom'

const Main: React.FC = () => {
    return (
        <React.StrictMode>
            <div>Loft-Traveler</div>
        </React.StrictMode>
    )
}

render(<Main />, document.getElementById('root'))
