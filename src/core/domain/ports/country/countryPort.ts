import type { TCountry } from 'core/domain/models/country/countryModel'

export interface IStatus {
    loading: boolean
    success: boolean
    error: boolean
}

export default interface ICountryPort {
    status: IStatus
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getCountries(filter?: any): Promise<TCountry[] | null>
}
