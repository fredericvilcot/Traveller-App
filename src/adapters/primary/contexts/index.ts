import React from 'react'
import type { IStores } from 'domain/stores/index'
import stores from 'domain/stores/index'

export const StoreContext: React.Context<IStores> = React.createContext({
    ...stores
})
