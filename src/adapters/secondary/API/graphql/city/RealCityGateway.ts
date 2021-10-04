import type { ApolloError, ApolloQueryResult } from '@apollo/client'
import { loader } from 'graphql.macro'
import { action, makeObservable, observable } from 'mobx'

import ApiGateway from 'adapters/secondary/ApiGateway'
import type { IStatus } from 'core/domain/ports/city/cityPort'
import type ICityPort from 'core/domain/ports/city/cityPort'
import type { TCity } from 'core/domain/models/city/cityModel'
import type { DeepReadonly } from 'superTypes'
import type {
    QCitiesQuery,
    QCitiesQueryVariables,
    CityWhere
} from 'generated/queries/geoDataQueries'
import type { TCountry } from 'core/domain/models/country/countryModel'

const CITIES_QUERY = loader('../geoDataQueries/cities.graphql')

type TCityFilter = Readonly<{
    limit?: number
    skip?: number
    where?: CityWhere
}>

export default class RealCityGateway extends ApiGateway implements ICityPort {
    @observable public status: IStatus = { loading: false, success: false, error: false }

    constructor() {
        super()
        makeObservable(this)
    }

    @action public setLoading = (loading: boolean): void => {
        this.status.loading = loading
    }

    @action public setSuccess = (success: boolean): void => {
        this.status.success = success
    }

    @action public setError = (error: boolean): void => {
        this.status.error = error
    }

    public getCities = async (filter?: TCityFilter): Promise<TCity[] | null> => {
        this.setLoading(true)
        return this.client()
            .query<QCitiesQuery, QCitiesQueryVariables>({
                query: CITIES_QUERY,
                notifyOnNetworkStatusChange: true,
                fetchPolicy: 'no-cache',
                variables: {
                    skip: filter?.skip ?? 0,
                    limit: filter?.limit ?? 50,
                    where: filter?.where ?? {}
                }
            })
            .then((payload: DeepReadonly<ApolloQueryResult<QCitiesQuery>>) => {
                this.setLoading(false)
                this.setSuccess(true)
                return this.mapCities(payload.data.cities)
            })
            .catch((error: DeepReadonly<ApolloError>) => {
                this.setError(true)
                console.error(
                    `Ooops ... There is an error whith retrieving cities from server ... See error => ${error}`
                )
                return null
            })
    }

    private mapCities = (citiesFromApi: DeepReadonly<QCitiesQuery['cities']>): TCity[] =>
        // eslint-disable-next-line @typescript-eslint/typedef
        citiesFromApi.map(city => ({
            id: city.id,
            name: city.name,
            location: city.location,
            population: city.population,
            country: city.country as unknown as TCountry
        }))
}
