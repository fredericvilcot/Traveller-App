import { action, computed, makeObservable, observable } from 'mobx'

import type { TCountry } from 'domain/models/country/countryModel'
import type { TCity } from 'domain/models/city/cityModel'
import type ICityPort from 'domain/ports/city/cityPort'
import type ICountryPort from 'domain/ports/country/countryPort'
import type { DeepReadonly } from 'superTypes'

export class GeoDataStore {
    @observable private allCountries: TCountry[] | null = null
    @observable private allCities: TCity[] | null = null
    @observable private selected: TCity | TCountry | null = null
    protected realCityGateway: ICityPort
    protected realCountryGateway: ICountryPort

    constructor(
        realCityGateway: DeepReadonly<ICityPort>,
        realCountryGateway: DeepReadonly<ICountryPort>
    ) {
        makeObservable(this)
        this.realCityGateway = realCityGateway
        this.realCountryGateway = realCountryGateway
    }

    public get countries(): TCountry[] | null {
        return this.allCountries
    }

    public get cities(): TCity[] | null {
        return this.allCities
    }

    public get selectedGeoData(): TCountry | TCity | null {
        return this.selected
    }

    public get hasGatewayLoadingStatus(): boolean {
        return this.realCityGateway.status.loading || this.realCountryGateway.status.loading
    }

    public get hasGatewaySuccessStatus(): boolean {
        return this.realCityGateway.status.success || this.realCountryGateway.status.success
    }

    @computed
    public get hasResult(): boolean {
        return !!this.cities?.length || !!this.countries?.length
    }

    @action
    public setSelectedGeoData = (data: TCountry | TCity | null): void => {
        this.selected = data
    }

    @action
    public retrieveCountries = async (filter?: unknown): Promise<void> => {
        this.allCountries = await this.realCountryGateway.getCountries(filter)
    }

    @action
    public retrieveCities = async (filter?: unknown): Promise<void> => {
        this.allCities = await this.realCityGateway.getCities(filter)
    }
}
