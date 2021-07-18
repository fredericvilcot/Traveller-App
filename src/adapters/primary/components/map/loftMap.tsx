import type { LatLngExpression, Map } from 'leaflet'
import { reaction } from 'mobx'
import { observer, useLocalStore } from 'mobx-react'
import React, { useEffect } from 'react'
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
    console.log(geoDataStore)
    const localState = useLocalStore(
        (): TLocalStore => ({
            map: null,
            setMap: (map: DeepReadonly<Map> | null): void => {
                localState.map = map
            }
        })
    )

    useEffect(() => {
        reaction(
            () => geoDataStore.cityLatAndLon,
            (coordinates?: Readonly<TLocation>) => {
                if (localState.map && coordinates) {
                    const latLng: LatLngExpression = { lat: coordinates.lat, lng: coordinates.long }
                    localState.map.flyTo(latLng)
                }
            }
        )
    })

    return (
        <div className="loft-map-main">
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
