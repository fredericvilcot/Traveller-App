import type ICityPort from 'domain/ports/city/cityPort'
import type { IStatus } from 'domain/ports/city/cityPort'
import type { TCity } from 'domain/models/city/cityModel'
import type { TCountry } from 'domain/models/country/countryModel'
import type { DeepReadonly } from 'superTypes'

type TCityFilter = Readonly<{
    limit?: number
    skip?: number
    where?: CityWhere
}>

type TCityPayload = Readonly<{
    id: string
    name: string
    location?: {
        lat: number
        long: number
    }
    population: number
    country?: unknown
}>

type WhereString = Readonly<{
    eq?: string | null
    neq?: string | null
    in?: string[] | null
    nin?: string[] | null
}>

type WhereInt = Readonly<{
    eq?: number | null
    neq?: number | null
    in?: number[] | null
    nin?: number[] | null
    lt?: number | null
    gt?: number | null
}>

type CityWhere = Readonly<{
    id?: WhereString | null
    name?: WhereString | null
    countryName?: WhereString | null
    population?: WhereInt | null
}>

export default class InMemoryCityGateway implements ICityPort {
    public status: IStatus = { loading: false, success: false, error: false }
    private cities: DeepReadonly<TCityPayload[]> = []

    public getCities = async (filter?: TCityFilter): Promise<TCity[]> =>
        this.mapCities(this.findCitiesByName(filter))

    public addCities = (cities: DeepReadonly<TCityPayload[]>): void => {
        this.cities = cities
    }

    public removeCities = (): void => {
        this.cities = []
    }

    public setSuccessStatus = (): void => {
        this.status.success = true
    }

    private findCitiesByName = (filter?: TCityFilter): TCityPayload[] => {
        return this.cities.filter(
            (city: DeepReadonly<TCityPayload>) => city.name === filter?.where?.name?.eq
        )
    }

    private mapCities = (citiesFromApi: DeepReadonly<TCityPayload[]>): TCity[] =>
        citiesFromApi.map(city => ({
            id: city.id,
            name: city.name,
            location: city.location,
            population: city.population,
            country: city.country as TCountry
        }))
}
