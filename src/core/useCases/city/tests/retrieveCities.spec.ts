import InMemoryCityGateway from 'adapters/secondary/API/graphql/city/InMemoryCityGateway'
import { RetrieveCities } from 'core/useCases/city/retrieveCities'
import { CityDataStore } from 'mobx/stores/city/cityDataStore'
import { mockCities } from './mockCities'

describe('Retrieve cities', () => {
    let cityGateway: InMemoryCityGateway
    let cityDataStore: CityDataStore
    let retrieveCitiesUseCase: RetrieveCities

    beforeEach(() => {
        cityGateway = new InMemoryCityGateway()
        cityDataStore = new CityDataStore()
        retrieveCitiesUseCase = new RetrieveCities(cityGateway, cityDataStore)
        cityGateway.addCities(mockCities)
    })

    it('should not retrieve any cities when no one exists', async () => {
        cityGateway.removeCities()
        await retrieveCitiesUseCase.retrieveCities({ where: { name: { eq: 'Lima' } } })
        expect(cityDataStore.allCities).toEqual([])
    })

    it('should retrieve all cities with given filter by name', async () => {
        await retrieveCitiesUseCase.retrieveCities({ where: { name: { eq: 'Lima' } } })
        expect(cityDataStore.allCities).toEqual(
            mockCities.filter((city: any) => city.name === 'Lima')
        )
    })
})
