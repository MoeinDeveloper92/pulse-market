'use client'
import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { fetchProperty } from '@/utils/request'
import PropertyHeaderImage from '@/components/PropertyHeaderImage'
import Link from 'next/link'
import PropertyDetails from '@/components/PropertyDetails'
import { FaArrowLeft } from "react-icons/fa"
import Spinner from '@/components/Spinner'
import PropertyImages from '@/components/PropertyImages'
import BookmarkButton from '@/components/BookmarkButton'
import ShareButtons from '@/components/ShareButtons'
import PropertyContactForm from '@/components/PropertyContactForm'

const PropertyPage = () => {
    const [property, setProperty] = useState(null)
    const [loading, setLoading] = useState(true)
    const { id } = useParams()

    useEffect(() => {
        const fetchPropertyData = async () => {
            if (!id) return;
            try {

                const property = await fetchProperty(id)
                setProperty(property)
            } catch (error) {
                console.error("Error fetching property: ", error)
            } finally {
                setLoading(false)
            }
        }
        if (property === null) {
            fetchPropertyData()
        }
    }, [id, property])

    if (!property && !loading) {
        return <h1 className='text-center text-2xl font-bold mt-10'>Proeprty Not Found</h1>
    }

    if (loading) {
        return <Spinner loading={loading} />
    }
    return (
        <Fragment>
            {!loading && property && (
                <Fragment>
                    <PropertyHeaderImage image={property.images[0]} />
                    <section>
                        <div className="container mx-auto py-6 px-6">
                            <Link
                                href="/properties"
                                className="text-blue-500 hover:text-blue-600 flex items-center"
                            >
                                <FaArrowLeft /> Back to Properties
                            </Link>
                        </div>
                    </section>
                    <section className="bg-blue-50">
                        <div className="container m-auto py-10 px-6">
                            <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                                {/* instead using prop drilling we ciuld have used other state managemenr,,,redux,,, the cominatio of useReducer, useContext */}
                                <PropertyDetails property={property} />

                                <aside className="space-y-4">
                                    <BookmarkButton property={property} />
                                    <ShareButtons property={property} />
                                    <PropertyContactForm property={property} />
                                </aside>
                            </div>
                        </div>
                    </section>
                    <PropertyImages images={property.images} />
                </Fragment>
            )}
        </Fragment>
    )
}

export default PropertyPage