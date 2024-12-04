"use client"
import React, { useState, useEffect, Fragment } from 'react'
import { useSearchParams } from 'next/navigation'
import Spinner from '@/components/Spinner'
import Link from 'next/link'
import { FaArrowAltCircleLeft } from 'react-icons/fa'
import PropertyCard from '@/components/PropertyCard'
import PropertySearchForm from '@/components/PropertySearchForm'


const SearchResultsPage = () => {
    const searchParams = useSearchParams()
    const [properties, setProperties] = useState([])
    const [loading, setLoading] = useState(true)

    const location = searchParams.get("location")
    const propertyType = searchParams.get("propertyType")


    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const res = await fetch(`/api/properties/search?location=${location}&propertyType=${propertyType}`)
                if (res.status === 200) {
                    const data = await res.json()
                    setProperties(data)
                    setLoading(false)
                } else {
                    setProperties([])
                    setLoading(false)
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        fetchSearchResults()
    }, [location, propertyType])


    return (
        <>
            <section className='bg-blue-700 py-4 '>
                <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
                    <PropertySearchForm />
                </div>
            </section>

            {loading ? (<Spinner loading={loading} />) :
                <Fragment>


                    <section className="px-4 py-6">
                        <div className="container-xl lg:container m-auto">
                            <Link href={"/properties"} className='flex items-center text-blue-500 hover:underline mb-3'>
                                <FaArrowAltCircleLeft className='mr-2' />Backt to Properties
                            </Link>
                            <h1 className="text-2xl mb-4 text-center pb-5">Search Results</h1>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {properties.length === 0 ? (
                                    <p>No Search results Found!</p>
                                ) : properties.map((property) => (
                                    <PropertyCard
                                        key={property._id}
                                        property={property}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>

                </Fragment>
            }
        </>
    )
}

export default SearchResultsPage