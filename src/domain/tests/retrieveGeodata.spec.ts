import InMemoryCityGateway from 'adapters/secondary/city/InMemoryCityGateway'
import InMemoryCountryGateway from 'adapters/secondary/country/InMemoryCountryGateway'
import { GeoDataStore } from 'domain/stores/geoDataStore'
import { mockCities } from './mockCities'
import { mockCountries } from './mockCountries'

describe('Retrieve Geo Data', () => {
    let cityGateway: InMemoryCityGateway
    let countryGateway: InMemoryCountryGateway
    let geoDataStore: GeoDataStore

    beforeEach(() => {
        cityGateway = new InMemoryCityGateway()
        countryGateway = new InMemoryCountryGateway()
        cityGateway.addCities(mockCities)
        countryGateway.addCountries(mockCountries)
        geoDataStore = new GeoDataStore(cityGateway, countryGateway)
    })

    it('should not retrieve any cities when no one exists', async () => {
        cityGateway.removeCities()
        await geoDataStore.retrieveCities({ where: { name: { eq: 'Lima' } } })
        expect(geoDataStore.cities).toEqual([])
    })

    it('should not retrieve any countries when no one exists', async () => {
        countryGateway.removeCountries()
        await geoDataStore.retrieveCountries({ where: { name: { eq: 'France' } } })
        expect(geoDataStore.countries).toEqual([])
    })

    it('should retrieve all cities with given filter by name', async () => {
        await geoDataStore.retrieveCities({ where: { name: { eq: 'Lima' } } })
        expect(geoDataStore.cities).toEqual(mockCities.filter((city: any) => city.name === 'Lima'))
    })

    it('should retrieve all countries with given filter by name', async () => {
        await geoDataStore.retrieveCountries({ where: { name: { eq: 'Finland' } } })
        expect(geoDataStore.countries).toEqual(
            mockCountries.filter((country: any) => country.name === 'Finland')
        )
    })

    it('should select a city with given id', async () => {
        await geoDataStore.retrieveCities({ where: { name: { eq: 'Lima' } } })
        geoDataStore.setSelectedCityByID('Q2868')
        expect(geoDataStore.selectedCity).toEqual(mockCities[1])
    })

    it('should select a country with given id', async () => {
        await geoDataStore.retrieveCountries({ where: { name: { eq: 'Canada' } } })
        geoDataStore.setSelectedCountryByID('Q16')
        expect(geoDataStore.selectedCountry).toEqual(mockCountries[1])
    })

    it('should retrieve selected city location if present', async () => {
        await geoDataStore.retrieveCities({ where: { name: { eq: 'Toulouse' } } })
        geoDataStore.setSelectedCityByID('Q7880')
        expect(geoDataStore.selectedCityLatAndLon).toEqual({
            lat: 43.604444,
            long: 1.443889
        })
    })

    it('should retrieve selected country location if present', async () => {
        await geoDataStore.retrieveCountries({ where: { name: { eq: 'Finland' } } })
        geoDataStore.setSelectedCountryByID('Q33')
        expect(geoDataStore.selectedCountryLatAndLon).toEqual({
            lat: 65,
            long: 27
        })
    })

    it('should switch gateway status to success after retrieving cities', async () => {
        cityGateway.setSuccessStatus()
        expect(geoDataStore.hasGatewaySuccessStatus).toBe(true)
    })
})
