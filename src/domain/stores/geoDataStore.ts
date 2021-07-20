import { makeObservable, observable, runInAction } from 'mobx'

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

    public get hasResult(): boolean {
        return !!this.cities?.length || !!this.countries?.length
    }

    public get hasMultipleCitiesResult(): boolean {
        return !!this.allCities && this.allCities.length > 1
    }

    public get selectedCityLatAndLon(): TLocation | undefined {
        if (!this.currentSelectedCity || !this.currentSelectedCity.location) {
            return
        }
        return this.currentSelectedCity.location
    }

    public get selectedCountryLatAndLon(): TLocation | undefined {
        if (!this.currentSelectedCountry || !this.currentSelectedCountry.location) {
            return
        }
        return this.currentSelectedCountry.location
    }

    public setSelectedCityByID = (id: string): void => {
        runInAction(() => {
            this.currentSelectedCity =
                this.allCities?.find((city: DeepReadonly<TCity>) => city.id === id) ?? null
        })
    }

    public setSelectedCountryByID = (id: string): void => {
        runInAction(() => {
            this.currentSelectedCountry =
                this.allCountries?.find((country: DeepReadonly<TCountry>) => country.id === id) ??
                null
        })
    }

    public retrieveCountries = async (filter?: unknown): Promise<void> => {
        this.resetGeoData()
        const countries = await this.countryGateway.getCountries(filter)
        runInAction(() => {
            this.allCountries = countries
            if (this.allCountries?.length) {
                this.currentSelectedCountry = this.allCountries[0]
            }
        })
    }

    public retrieveCities = async (filter?: unknown): Promise<void> => {
        this.resetGeoData()
        const cities = await this.cityGateway.getCities(filter)
        runInAction(() => {
            this.allCities = cities
            if (this.allCities?.length === 1) {
                this.currentSelectedCity = this.allCities[0]
            }
        })
    }

    private resetGeoData = (): void => {
        runInAction(() => {
            this.allCities = null
            this.allCountries = null
            this.currentSelectedCity = null
            this.currentSelectedCountry = null
        })
    }
}
