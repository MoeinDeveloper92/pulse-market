import React, { Fragment } from 'react'
import Hero from '@/components/Hero'
import InfoBoxes from '@/components/InfoBoxes'
import HomeProperties from '@/components/HomeProperties'


const HomePage = () => {

    return (
        <Fragment>
            <Hero />
            <InfoBoxes />
            <HomeProperties />
        </Fragment>
    )
}

export default HomePage


//this is sth that is supposed to be shown on the scrren when the user virist sthe  "/" page