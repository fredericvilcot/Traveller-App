import classNames from 'classnames'
import type { LatLngExpression, Map } from 'leaflet'
import { reaction } from 'mobx'
import { observer, useLocalStore } from 'mobx-react'
import React, { useCallback, useEffect } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'

import { useStores } from 'adapters/primary/hooks/index'
import type { GeoDataStore } from 'domain/stores/geoDataStore'
import type { TLocation } from 'domain/models/main'
import type { DeepReadonly } from 'superTypes'

import 'leaflet/dist/leaflet.css'
import './loftMap.scss'

type TLoftMapStore = {
    geoDataStore: GeoDataStore
}

type TLocalStore = {
    map: DeepReadonly<Map> | null
    setMap: (map: DeepReadonly<Map> | null) => void
}

export const LoftMap: React.FC = observer(() => {
    const { geoDataStore }: TLoftMapStore = useStores()
    const localState = useLocalStore(
        (): TLocalStore => ({
            map: null,
            setMap: (map: DeepReadonly<Map> | null): void => {
                localState.map = map
            }
        })
    )

    const flyToLatLng = useCallback(
        (latLng: LatLngExpression): void => {
            if (localState.map) {
                localState.map.flyTo(latLng)
            }
        },
        [localState.map]
    )

    useEffect(() => {
        reaction(
            () => geoDataStore.selectedCityLatAndLon,
            (coordinates?: Readonly<TLocation>) => {
                if (coordinates) {
                    const latLng: LatLngExpression = { lat: coordinates.lat, lng: coordinates.long }
                    flyToLatLng(latLng)
                }
            }
        )
        reaction(
            () => geoDataStore.selectedCountryLatAndLon,
            (coordinates?: Readonly<TLocation>) => {
                if (coordinates) {
                    const latLng: LatLngExpression = { lat: coordinates.lat, lng: coordinates.long }
                    flyToLatLng(latLng)
                }
            }
        )
    })

    return (
        <div
            className={classNames('loft-map-main', {
                'full-width': !geoDataStore.selectedCity && !geoDataStore.selectedCountry
            })}
        >
            <MapContainer
                center={[51.505, -0.09]}
                className="loft-map-container"
                scrollWheelZoom={false}
                whenCreated={localState.setMap}
                zoom={13}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </div>
    )
})
