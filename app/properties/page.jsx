
import React, { Fragment } from 'react'
import PropertyCard from '@/components/PropertyCard'
import { fetchProperties } from "@/utils/request"



const propertyPage = async () => {
    const properties = await fetchProperties()
    // Sort property bgy dates
    properties.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    return (
        <Fragment>
            <section className="px-4 py-6">
                <div className="container-xl lg:container m-auto px-4 py-6">
                    {properties && properties.length === 0 ? (
                        <p>
                            No Properties Found...
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {properties.map((property) => (
                                <PropertyCard
                                    key={property._id}
                                    property={property}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </Fragment>
    )
}


export default propertyPage