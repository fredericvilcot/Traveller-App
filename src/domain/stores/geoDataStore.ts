import { action, computed, makeObservable, observable } from 'mobx'

import type { TCountry } from 'domain/models/country/countryModel'
import type { TLocation } from 'domain/models/main'
import type { TCity } from 'domain/models/city/cityModel'
import type ICityPort from 'domain/ports/city/cityPort'
import type ICountryPort from 'domain/ports/country/countryPort'
import type { DeepReadonly } from 'superTypes'

export class GeoDataStore {
    @observable private allCountries: TCountry[] | null = null
    @observable private allCities: TCity[] | null = null
    @observable private currentSelectedCity: TCity | null = null
    @observable private currentSelectedCountry: TCountry | null = null
    protected cityGateway: ICityPort
    protected countryGateway: ICountryPort

    constructor(cityGateway: DeepReadonly<ICityPort>, countryGateway: DeepReadonly<ICountryPort>) {
        makeObservable(this)
        this.cityGateway = cityGateway
        this.countryGateway = countryGateway
    }

    public get countries(): TCountry[] | null {
        return this.allCountries
    }

    public get cities(): TCity[] | null {
        return this.allCities
    }

    public get selectedCity(): TCity | null {
        return this.currentSelectedCity
    }

    public get selectedCountry(): TCountry | null {
        return this.currentSelectedCountry
    }

    public get hasGatewayLoadingStatus(): boolean {
        return this.cityGateway.status.loading || this.countryGateway.status.loading
    }

    public get hasGatewaySuccessStatus(): boolean {
        return this.cityGateway.status.success || this.countryGateway.status.success
    }

    @computed
    public get hasResult(): boolean {
        return !!this.cities?.length || !!this.countries?.length
    }

    @computed
    public get hasMultipleCitiesResult(): boolean {
        return !!this.allCities && this.allCities.length > 1
    }

    @computed
    public get selectedCityLatAndLon(): TLocation | undefined {
        if (!this.currentSelectedCity || !this.currentSelectedCity.location) {
            return
        }
        return this.currentSelectedCity.location
    }

    @computed
    public get selectedCountryLatAndLon(): TLocation | undefined {
        if (!this.currentSelectedCountry || !this.currentSelectedCountry.location) {
            return
        }
        return this.currentSelectedCountry.location
    }

    @action
    public setSelectedCityByID = (id: string): void => {
        this.currentSelectedCity =
            this.allCities?.find((city: DeepReadonly<TCity>) => city.id === id) ?? null
    }

    @action
    public setSelectedCountryByID = (id: string): void => {
        this.currentSelectedCountry =
            this.allCountries?.find((country: DeepReadonly<TCountry>) => country.id === id) ?? null
    }

    @action
    public retrieveCountries = async (filter?: unknown): Promise<void> => {
        this.resetGeoData()
        this.allCountries = await this.countryGateway.getCountries(filter)
        if (this.allCountries) {
            this.currentSelectedCountry = this.allCountries[0]
        }
    }

    @action
    public retrieveCities = async (filter?: unknown): Promise<void> => {
        this.resetGeoData()
        this.allCities = await this.cityGateway.getCities(filter)
        if (this.allCities?.length === 1) {
            this.currentSelectedCity = this.allCities[0]
        }
    }

    @action
    private resetGeoData = (): void => {
        this.allCities = null
        this.allCountries = null
        this.currentSelectedCity = null
        this.currentSelectedCountry = null
    }
}
