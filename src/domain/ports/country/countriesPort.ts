import type { TCountry } from 'domain/models/country/countryModel'

export type TGetCountries<T> = (filter?: T) => Promise<TCountry[]>
