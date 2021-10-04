import React from 'react'

import type { ICoreUseCases } from 'core/useCases/index'
import coreUseCases from 'core/useCases/index'
import type { IStores } from 'mobx/stores/index'
import stores from 'mobx/stores/index'

export const StoreContext: React.Context<IStores> = React.createContext({
    ...stores
})

export const UseCasesContext: React.Context<ICoreUseCases> = React.createContext({
    ...coreUseCases
})
