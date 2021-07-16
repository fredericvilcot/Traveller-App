import type { TLocation, TLanguage, TCurrency } from '../main'
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
}
