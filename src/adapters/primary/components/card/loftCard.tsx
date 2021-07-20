import classNames from 'classnames'
import { observer } from 'mobx-react'
import React from 'react'

import { useStores } from 'adapters/primary/hooks/index'
import type { GeoDataStore } from 'domain/stores/geoDataStore'

import './loftCard.scss'
import type { DeepReadonly } from 'superTypes'
import type { TCurrency, TLanguage } from 'domain/models/main'

type TLoftCardStore = {
    geoDataStore: GeoDataStore
}

export const LoftCard: React.FC = observer(() => {
    const { geoDataStore }: TLoftCardStore = useStores()

    const cityName = geoDataStore.selectedCity?.name ?? ''
    const countryName = geoDataStore.selectedCountry?.name ?? ''
    const cityPopulation = geoDataStore.selectedCity?.population.toLocaleString() ?? ''
    const countryPopulation = geoDataStore.selectedCountry?.population.toLocaleString() ?? ''
    const cityLocationLat = geoDataStore.selectedCityLatAndLon?.lat ?? ''
    const cityLocationLon = geoDataStore.selectedCityLatAndLon?.long ?? ''
    const countryLocationLat = geoDataStore.selectedCountryLatAndLon?.lat ?? ''
    const countryLocationLon = geoDataStore.selectedCountryLatAndLon?.long ?? ''

    return (
        <div
            className={classNames('loft-card-main', {
                hidden: !geoDataStore.selectedCity && !geoDataStore.selectedCountry
            })}
        >
            {!geoDataStore.hasGatewayLoadingStatus && geoDataStore.hasResult && (
                <div className="loft-card-content-wrapper">
                    <h1>{cityName || countryName}</h1>
                    <span>{`Population : ${cityPopulation || countryPopulation}`}</span>
                    <span>{`Latitude : ${cityLocationLat || countryLocationLat}`}</span>
                    <span>{`Longitude : ${cityLocationLon || countryLocationLon}`}</span>
                    {geoDataStore.selectedCountry && (
                        <React.Fragment>
                            <span>{`Capital : ${
                                geoDataStore.selectedCountry.capital?.name ?? ''
                            }`}</span>
                            <span>Currencies :</span>
                            {geoDataStore.selectedCountry.currencies.map(
                                (currency: DeepReadonly<TCurrency>) => (
                                    <li key={currency.id}>{currency.name}</li>
                                )
                            )}
                            <span>Languages :</span>
                            {geoDataStore.selectedCountry.languages.map(
                                (language: DeepReadonly<TLanguage>) => (
                                    <li key={language.id}>{language.name}</li>
                                )
                            )}
                        </React.Fragment>
                    )}
                </div>
            )}
        </div>
    )
})
