import React, { Fragment } from 'react'
import Hero from '@/components/Hero'
import InfoBoxes from '@/components/InfoBoxes'
import HomeProperties from '@/components/HomeProperties'
import FeaturedProperties from '@/components/FeaturedProperties'

const HomePage = () => {

    return (
        <Fragment>
            <Hero />
            <InfoBoxes />
            <FeaturedProperties />
            <HomeProperties />
        </Fragment>
    )
}

export default HomePage


//this is sth that is supposed to be shown on the scrren when the user virist sthe  "/" page