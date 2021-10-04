import type ICityPort from 'core/domain/ports/city/cityPort'
import type { CityDataStore } from 'mobx/stores/city/cityDataStore'
import type { DeepReadonly } from 'superTypes'

export class RetrieveCities {
    protected cityGateway: DeepReadonly<ICityPort>
    protected cityDataStore: DeepReadonly<CityDataStore>

    constructor(cityGateway: DeepReadonly<ICityPort>, cityDataStore: DeepReadonly<CityDataStore>) {
        this.cityGateway = cityGateway
        this.cityDataStore = cityDataStore
    }

    public retrieveCities = async (filter?: unknown): Promise<void> => {
        const cities = await this.cityGateway.getCities(filter)
        if (cities) {
            this.cityDataStore.retrieveCities(cities)
        }
    }
}
