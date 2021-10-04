import React from 'react'

import { StoreContext, UseCasesContext } from '../contexts/index'
import type { ICoreUseCases } from 'core/useCases'
import type { IStores } from 'mobx/stores/index'

export const useStores = (): IStores => React.useContext(StoreContext)
export const useCoreUseCases = (): ICoreUseCases => React.useContext(UseCasesContext)
