import type { TLocation, TLanguage, TCurrency } from '../main'
import type { TCity } from 'domain/models/city/cityModel'
import type { DeepReadonly } from 'superTypes'

export type TCountry = {
    id: string
    name: string
    location?: TLocation | null
    population: number
    currencies: DeepReadonly<TCurrency[]>
    languages: DeepReadonly<TLanguage[]>
    capital?: DeepReadonly<TCity> | null
}
