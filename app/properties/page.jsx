'use client'
import React, { Fragment } from 'react'
import Link from 'next/link'
const propertyPage = () => {

    return (
        <Fragment>
            <h1 className="text-8xl text-red-200">See All the available  rpoperties</h1>
            <Link href={"/"} className='text-6xl bg-blue-400 px-2 py-1 rounded-lg mt-10'>
                Back
            </Link>
        </Fragment>
    )
}


export default propertyPage