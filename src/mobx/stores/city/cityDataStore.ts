import { makeObservable, observable, runInAction } from 'mobx'

import type { TCity } from 'core/domain/models/city/cityModel'
import type { DeepReadonly } from 'superTypes'

export class CityDataStore {
    @observable private cities: TCity[] = []

    constructor() {
        makeObservable(this)
    }

    get allCities(): TCity[] {
        return this.cities
    }

    public retrieveCities = async (cities: DeepReadonly<TCity[]>): Promise<void> => {
        this.resetCities()
        runInAction(() => {
            this.cities = cities.slice()
            // if (this.allCities?.length === 1) {
            //     this.currentSelectedCity = this.allCities[0]
            // }
        })
    }

    private resetCities = (): void => {
        runInAction(() => {
            this.cities = []
        })
    }
}
