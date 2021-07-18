import { observer } from 'mobx-react'
import React, { useCallback, useRef } from 'react'
import { GeoDataSearch } from 'adapters/primary/components/search/geoDataSearch'
import { LoftCarousel } from 'adapters/primary/components/carousel/loftCarousel'

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
            <div ref={contentRef} style={{ height: '100%' }}>
                <GeoDataSearch />
            </div>
        </React.Fragment>
    )
})
