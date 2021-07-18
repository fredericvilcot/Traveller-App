import { action, makeObservable, observable } from 'mobx'

import { getCountries } from 'adapters/secondary/country/countriesGateway'
import { getCities } from 'adapters/secondary/city/citiesGateway'
import type { TCountry } from 'domain/models/country/countryModel'
import type { TCity } from 'domain/models/city/cityModel'

export class GeoDataStore {
    @observable private allCountries: TCountry[] = []
    @observable private allCities: TCity[] = []
    constructor() {
        makeObservable(this)
    }

    public get countries(): TCountry[] {
        return this.allCountries
    }

    public get cities(): TCity[] {
        return this.allCities
    }

    @action
    public retrieveCountries = async (): Promise<void> => {
        this.allCountries = await getCountries()
    }

    @action
    public retrieveCities = async (): Promise<void> => {
        this.allCities = await getCities()
    }
}
