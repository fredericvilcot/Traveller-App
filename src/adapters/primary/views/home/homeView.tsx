import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import { useStores } from 'adapters/primary/hooks/index'
import type { GeoDataStore } from 'domain/stores/geoDataStore'

type THomeViewStore = {
    geoDataStore: GeoDataStore
}

export const HomeView: React.FC = observer(() => {
    const { geoDataStore }: THomeViewStore = useStores()

    useEffect(() => {
        geoDataStore.retrieveCountries()
        geoDataStore.retrieveCities()
    }, [geoDataStore])

    return (
        <>
            <div>Countries : </div>
            <div>{JSON.stringify(geoDataStore.countries)}</div>
            <div>Cities : </div>
            <div>{JSON.stringify(geoDataStore.countries)}</div>
        </>
    )
})
