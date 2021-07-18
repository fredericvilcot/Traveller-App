import React from 'react'
import { Carousel } from 'react-responsive-carousel'

import Button from '@material-ui/core/Button'
import ExploreIcon from '@material-ui/icons/Explore'

import autumn from '../../assets/autumn.jpeg'
import city from '../../assets/city.jpeg'
import island from '../../assets/island.jpeg'
import mountain from '../../assets/mountain.jpeg'

import 'react-responsive-carousel/lib/styles/carousel.min.css'
import './loftCarousel.scss'

type TLoftCarouselProps = Readonly<{
    onCarouselButtonClick: () => void
}>

export const LoftCarousel: React.FC<TLoftCarouselProps> = ({
    onCarouselButtonClick
}: TLoftCarouselProps) => {
    const button: JSX.Element = (
        <div className="loft-action-button">
            <Button
                classes={{
                    root: 'loft-action-button-root',
                    startIcon: 'loft-action-button-start-icon'
                }}
                color="primary"
                onClick={onCarouselButtonClick}
                startIcon={<ExploreIcon />}
                variant="contained"
            >
                Explore
            </Button>
        </div>
    )
    return (
        <div className="loft-carousel-main">
            <Carousel
                autoPlay
                infiniteLoop
                interval={8000}
                showStatus={false}
                showThumbs={false}
                transitionTime={800}
            >
                <div>
                    <img src={island} />
                    {button}
                </div>
                <div>
                    <img src={city} />
                    {button}
                </div>
                <div>
                    <img src={mountain} />
                    {button}
                </div>
                <div>
                    <img src={autumn} />
                    {button}
                </div>
            </Carousel>
        </div>
    )
}
