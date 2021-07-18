import { configure } from 'mobx'
import { GeoDataStore } from './geoDataStore'

configure({ enforceActions: 'observed' })

export interface IStores {
    geoDataStore: GeoDataStore
}

export const geoDataStore: GeoDataStore = new GeoDataStore()

const stores: IStores = {
    geoDataStore
}

export default stores
