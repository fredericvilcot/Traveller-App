import { configure } from 'mobx'
import { CountryStore } from './country/countryStore'

configure({ enforceActions: 'observed' })

export interface IStores {
    countryStore: CountryStore
}

export const countryStore: CountryStore = new CountryStore()

const stores: IStores = {
    countryStore
}

export default stores
