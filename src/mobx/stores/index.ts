import { configure } from 'mobx'
import RealCityGateway from 'adapters/secondary/API/graphql/city/RealCityGateway'
import RealContryGateway from 'adapters/secondary/API/graphql/country/RealCountryGateway'
import { CityDataStore } from 'mobx/stores/city/cityDataStore'
import { GeoDataStore } from 'mobx/stores/geoDataStore'

configure({ enforceActions: 'always' })

export interface IStores {
    cityDataStore: CityDataStore
    geoDataStore: GeoDataStore
}

const realCityGateway: RealCityGateway = new RealCityGateway()
const realCountryGateway: RealContryGateway = new RealContryGateway()
export const geoDataStore: GeoDataStore = new GeoDataStore(realCityGateway, realCountryGateway)

export const cityDataStore = new CityDataStore()

const stores: IStores = {
    cityDataStore,
    geoDataStore
}

export default stores
