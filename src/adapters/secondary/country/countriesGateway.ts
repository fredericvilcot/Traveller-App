import type { ApolloQueryResult } from '@apollo/client'
import { loader } from 'graphql.macro'
import { Client } from 'adapters/secondary/ApiGateway'
import type { TGetCountries, TCountryFilter } from 'domain/ports/country/countryPort'
import type { TCountry } from 'domain/models/country/countryModel'
import type { DeepReadonly } from 'superTypes'
import type {
    QCountriesQuery,
    QCountriesQueryVariables,
    CountryWhere
} from '../../../../build/gen-src/app/queries/countryQueries'

const COUNTRIES_QUERY = loader('./countryQueries/countries.graphql')

const mapCountries = (countriesFromApi: DeepReadonly<QCountriesQuery['countries']>): TCountry[] =>
    // eslint-disable-next-line @typescript-eslint/typedef
    countriesFromApi.map(country => ({
        id: country.id,
        name: country.name,
        location: country.location,
        population: country.population,
        phoneCodes: country.callingCodes,
        currencies: country.currencies,
        languages: country.languages,
        vatRate: country.vatRate
    }))

export const getCountries: TGetCountries<CountryWhere> = async (
    filter?: TCountryFilter<CountryWhere>
): Promise<TCountry[]> => {
    const { data }: ApolloQueryResult<QCountriesQuery> = await Client.query<
        QCountriesQuery,
        QCountriesQueryVariables
    >({
        query: COUNTRIES_QUERY,
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'no-cache',
        variables: {
            skip: filter?.skip ?? 0,
            limit: filter?.limit ?? 50,
            where: filter?.where ?? {}
        }
    })
    return mapCountries(data.countries)
}
