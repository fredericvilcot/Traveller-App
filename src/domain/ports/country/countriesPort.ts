import type { TCountry } from '../../models/country/countryModel'

export type TCountryFilter<T> = Readonly<{
    limit?: number
    skip?: number
    where?: T
}>
export type TGetCountries<T> = (filter?: TCountryFilter<T>) => Promise<TCountry[]>
