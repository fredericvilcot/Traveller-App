import type { TLocation } from '../main'
import type { TCountry } from '../country/countryModel'
import type { DeepReadonly } from 'superTypes'

export type TCity = {
    id: string
    name: string
    location?: TLocation | null
    population: number
    country?: DeepReadonly<TCountry>
}
