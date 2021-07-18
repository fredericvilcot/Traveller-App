import type { ApolloQueryResult } from '@apollo/client'
import { loader } from 'graphql.macro'
import { Client } from 'adapters/secondary/ApiGateway'
import type { TFilter } from 'domain/ports/main'
import type { TGetCities } from 'domain/ports/city/citiesPort'
import type { TCity } from 'domain/models/city/cityModel'
import type { DeepReadonly } from 'superTypes'
import type {
    QCitiesQuery,
    QCitiesQueryVariables,
    CityWhere
} from '../../../../build/gen-src/app/queries/geoDataQueries'
import type { TCountry } from 'domain/models/country/countryModel'

const CITIES_QUERY = loader('../geoDataQueries/cities.graphql')

const mapCities = (citiesFromApi: DeepReadonly<QCitiesQuery['cities']>): TCity[] =>
    // eslint-disable-next-line @typescript-eslint/typedef
    citiesFromApi.map(city => ({
        id: city.id,
        name: city.name,
        location: city.location,
        population: city.population,
        country: city.country as unknown as TCountry
    }))

export const getCities: TGetCities<CityWhere> = async (
    filter?: TFilter<CityWhere>
): Promise<TCity[]> => {
    const { data }: ApolloQueryResult<QCitiesQuery> = await Client.query<
        QCitiesQuery,
        QCitiesQueryVariables
    >({
        query: CITIES_QUERY,
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'no-cache',
        variables: {
            skip: filter?.skip ?? 0,
            limit: filter?.limit ?? 50,
            where: filter?.where ?? {}
        }
    })
    return mapCities(data.cities)
}
