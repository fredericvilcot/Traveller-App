import { configure } from 'mobx'
import RealCityGateway from 'adapters/secondary/city/RealCityGateway'
import RealContryGateway from 'adapters/secondary/country/RealCountryGateway'
import { GeoDataStore } from 'domain/stores/geoDataStore'

configure({ enforceActions: 'always' })

export interface IStores {
    geoDataStore: GeoDataStore
}

const realCityGateway: RealCityGateway = new RealCityGateway()
const realCountryGateway: RealContryGateway = new RealContryGateway()
export const geoDataStore: GeoDataStore = new GeoDataStore(realCityGateway, realCountryGateway)

const stores: IStores = {
    geoDataStore
}

export default stores
