import type ICountryPort from 'core/domain/ports/country/countryPort'
import type { IStatus } from 'core/domain/ports/city/cityPort'
import type { TCity } from 'core/domain/models/city/cityModel'
import type { TCountry } from 'core/domain/models/country/countryModel'
import type { DeepReadonly } from 'superTypes'
import type { TCurrency, TLanguage, TLocation } from 'core/domain/models/main'

type TCountryFilter = Readonly<{
    limit?: number
    skip?: number
    where?: CountryWhere
}>

type TCountryPayload = Readonly<{
    id: string
    name: string
    location?: {
        lat: number
        long: number
    }
    population: number
    currencies: unknown
    languages: unknown
    capital?: unknown
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

type CountryWhere = Readonly<{
    id?: WhereString | null
    name?: WhereString | null
    alpha2Code?: WhereString | null
    alpha3Code?: WhereString | null
    population?: WhereInt | null
}>

export default class InMemoryCountryGateway implements ICountryPort {
    public status: IStatus = { loading: false, success: false, error: false }
    private countries: DeepReadonly<TCountryPayload[]> = []

    public getCountries = async (filter?: TCountryFilter): Promise<TCountry[]> =>
        this.mapCountries(this.findCountriesByName(filter))

    public addCountries = (countries: DeepReadonly<TCountryPayload[]>): void => {
        this.countries = countries
    }

    public removeCountries = (): void => {
        this.countries = []
    }

    private findCountriesByName = (filter?: TCountryFilter): TCountryPayload[] => {
        return this.countries.filter(
            (country: DeepReadonly<TCountryPayload>) => country.name === filter?.where?.name?.eq
        )
    }

    private mapCountries = (countriesFromApi: DeepReadonly<TCountryPayload[]>): TCountry[] =>
        // eslint-disable-next-line @typescript-eslint/typedef
        countriesFromApi.map((country: DeepReadonly<TCountryPayload>) => ({
            id: country.id,
            name: country.name,
            location: country.location as TLocation,
            population: country.population,
            currencies: country.currencies as TCurrency[],
            languages: country.languages as TLanguage[],
            capital: country.capital as TCity
        }))
}
