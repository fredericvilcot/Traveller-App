import { action, makeObservable, observable } from 'mobx'

import { getCountries } from 'adapters/secondary/country/countriesGateway'
import type { TCountry } from '../../models/country/countryModel'

export class CountryStore {
    @observable private allCountries: TCountry[] = []
    constructor() {
        makeObservable(this)
    }

    public get countries(): TCountry[] {
        return this.allCountries
    }

    @action
    public retrieveCountries = async (): Promise<void> => {
        this.allCountries = await getCountries()
    }
}
