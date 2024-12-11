
import React, { Fragment } from 'react'
import PropertyCard from '@/components/PropertyCard'
import { fetchProperties } from "@/utils/request"

import PropertySearchForm from '@/components/PropertySearchForm'
import Properties from '@/components/Properties'

const propertyPage = async () => {
    const data = await fetchProperties()
    // Sort property bgy dates
    data["properties"].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    return (
        <>
            <section className='bg-blue-700 py-4 '>
                <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
                    <PropertySearchForm />
                </div>
            </section>
            <Properties />
        </>
    )
}


export default propertyPage