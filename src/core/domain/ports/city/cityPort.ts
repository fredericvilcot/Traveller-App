import type { TCity } from 'core/domain/models/city/cityModel'

export interface IStatus {
    loading: boolean
    success: boolean
    error: boolean
}

export default interface ICityPort {
    status: IStatus
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getCities(filter?: any): Promise<TCity[] | null>
}
