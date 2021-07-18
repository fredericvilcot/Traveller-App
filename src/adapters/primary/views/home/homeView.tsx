import { observer } from 'mobx-react'
import React, { useCallback, useRef } from 'react'
import { GeoDataSearch } from 'adapters/primary/components/search/geoDataSearch'
import { LoftCarousel } from 'adapters/primary/components/carousel/loftCarousel'
import { LoftMap } from 'adapters/primary/components/map/loftMap'

import './homeView.scss'

export const HomeView: React.FC = observer(() => {
    const contentRef = useRef<HTMLDivElement>(null)

    const handleCarouselButtonClick = useCallback((): void => {
        contentRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
            inline: 'nearest'
        })
    }, [])

    return (
        <React.Fragment>
            <LoftCarousel onCarouselButtonClick={handleCarouselButtonClick} />
            <div className="loft-home-view-main" ref={contentRef}>
                <GeoDataSearch />
                <div className="loft-home-view-map-wrapper">
                    <LoftMap />
                    <div className="loft-home-empty">Salut</div>
                </div>
            </div>
        </React.Fragment>
    )
})
