import type { TCountry } from '../../models/country/countryModel'

export type TCountryFilter<P> = Readonly<{
    limit?: number
    skip?: number
    where?: P
}>
export type TGetCountries<T> = (filter?: TCountryFilter<T>) => Promise<TCountry[]>
