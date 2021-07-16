import React from 'react'
import { StoreContext } from '../contexts/index'
import type { IStores } from 'domain/stores/index'

export const useStores = (): IStores => React.useContext(StoreContext)
