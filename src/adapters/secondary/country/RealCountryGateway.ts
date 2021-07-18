import type { ApolloError, ApolloQueryResult } from '@apollo/client'
import { loader } from 'graphql.macro'
import { action, makeObservable, observable } from 'mobx'

import ApiGateway from 'adapters/secondary/ApiGateway'
import type ICountryPort from 'domain/ports/country/countryPort'
import type { IStatus } from 'domain/ports/country/countryPort'
import type { TCity } from 'domain/models/city/cityModel'
import type { TCountry } from 'domain/models/country/countryModel'
import type { DeepReadonly } from 'superTypes'
import type {
    QCountriesQuery,
    QCountriesQueryVariables,
    CountryWhere
} from '../../../../build/gen-src/app/queries/geoDataQueries'

const COUNTRIES_QUERY = loader('../geoDataQueries/countries.graphql')

type TCountryFilter = Readonly<{
    limit?: number
    skip?: number
    where?: CountryWhere
}>

export default class RealCountryGateway extends ApiGateway implements ICountryPort {
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

    public getCountries = async (filter?: TCountryFilter): Promise<TCountry[] | null> => {
        this.setLoading(true)
        return this.client()
            .query<QCountriesQuery, QCountriesQueryVariables>({
                query: COUNTRIES_QUERY,
                notifyOnNetworkStatusChange: true,
                fetchPolicy: 'no-cache',
                variables: {
                    skip: filter?.skip ?? 0,
                    limit: filter?.limit ?? 50,
                    where: filter?.where ?? {}
                }
            })
            .then((payload: DeepReadonly<ApolloQueryResult<QCountriesQuery>>) => {
                this.setLoading(false)
                this.setSuccess(true)
                return this.mapCountries(payload.data.countries)
            })
            .catch((error: DeepReadonly<ApolloError>) => {
                this.setError(true)
                console.error(
                    `Ooops ... There is an error whith retrieving countries from server ... See error => ${error}`
                )
                return null
            })
    }

    private mapCountries = (
        countriesFromApi: DeepReadonly<QCountriesQuery['countries']>
    ): TCountry[] =>
        // eslint-disable-next-line @typescript-eslint/typedef
        countriesFromApi.map(country => ({
            id: country.id,
            name: country.name,
            location: country.location,
            population: country.population,
            phoneCodes: country.callingCodes,
            currencies: country.currencies,
            languages: country.languages,
            vatRate: country.vatRate,
            capital: country.capital as unknown as TCity
        }))
}
