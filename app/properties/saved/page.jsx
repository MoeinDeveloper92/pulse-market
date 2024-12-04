"use client"
import React, { useState, useEffect } from 'react'
import PropertyCard from '@/components/PropertyCard'
import Spinner from '@/components/Spinner'
import { toast } from "react-toastify"



const PropertiesPage = () => {
    const [properties, setProperties] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchSavedProperties = async () => {
            try {
                const res = await fetch("/api/bookmarks")
                if (res.status === 200) {
                    const data = await res.json()
                    setProperties(data)
                    setLoading(false)
                } else {
                    toast.error(res.statusText("Failed to fetch Bookmarks"))
                }
            } catch (error) {
                console.log(res.statusText)
                toast.error("Failed to fetch saved proeprties!!!!")
            } finally {
                setLoading(false)
            }
        }
        fetchSavedProperties()
    }, [])
    if (loading) {
        return <Spinner />
    }


    return (
        <section className="px-4 py-6">
            <h1 className='text-2xl mb-4 text-center py-4'> Saved Properties</h1>
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
    )
}

export default PropertiesPage