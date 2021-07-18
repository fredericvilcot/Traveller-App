import type { TCity } from 'domain/models/city/cityModel'

export type TGetCities<T> = (filter?: T) => Promise<TCity[]>
