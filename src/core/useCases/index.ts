import RealCityGateway from 'adapters/secondary/API/graphql/city/RealCityGateway'
import { RetrieveCities } from 'core/useCases/city/retrieveCities'
import { cityDataStore } from 'mobx/stores/index'

export interface ICoreUseCases {
    retrieveCitiesUseCase: RetrieveCities
}

const realCityGateway = new RealCityGateway()
const retrieveCitiesUseCase = new RetrieveCities(realCityGateway, cityDataStore)

const coreUseCases: ICoreUseCases = {
    retrieveCitiesUseCase
}

export default coreUseCases
