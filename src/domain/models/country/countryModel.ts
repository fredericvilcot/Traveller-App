import type { TLocation, TLanguage, TCurrency } from '../main'
import type { TCity } from 'domain/models/city/cityModel'
import type { DeepReadonly } from 'superTypes'

export type TCountry = {
    id: string
    name: string
    location?: TLocation | null
    population: number
    phoneCodes: Readonly<string[]>
    currencies: DeepReadonly<TCurrency[]>
    languages: DeepReadonly<TLanguage[]>
    vatRate?: number | null
    capital: DeepReadonly<TCity>
}
