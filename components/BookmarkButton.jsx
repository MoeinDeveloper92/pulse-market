"use client"
import React, { useState, useEffect } from 'react'
import { FaBookmark } from "react-icons/fa"
import { useSession } from 'next-auth/react'
import { toast } from "react-toastify"
import Spinner from './Spinner'

const BookmarkButton = ({ property }) => {
    const { data: session } = useSession()
    const userId = session?.user?.id
    const [isBookmarked, setIsBookmarked] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!userId) {
            setLoading(false)
            return
        }
        const checkBookmarkStatus = async () => {
            const res = await fetch("/api/bookmarks/check", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ propertyId: property._id })
            })
            if (res.status === 200) {
                const data = await res.json()
                console.log("CHEKCING THE STATUS IF THE BOOKMARK====>", data["isBookmarked"])
                setIsBookmarked(data.isBookmarked)
            }

            setLoading(false)
        }
        checkBookmarkStatus()
    }, [property._id, userId])

    const handleClick = async () => {
        //irf the user ios not connected here!!!!
        if (!userId) {
            toast.error("You need to sign in to bookmark a Proeprty")
            return
        }

        try {
            const res = await fetch("/api/bookmarks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ propertyId: property._id })
            })
            if (res.status === 200) {
                const data = await res.json()
                toast.success(data.message)
                setIsBookmarked(data.isBookmarked)
                // setLoading(false)
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong!!!")
        } finally {
            // setLoading(false)
        }
    }

    if (loading) {
        return <Spinner />
    }
    return isBookmarked ?
        <button
            onClick={handleClick}
            className="bg-red-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
        >
            <FaBookmark className=" mr-2" />Remove From Bookmark
        </button> : (
            <button
                onClick={handleClick}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
            >
                <FaBookmark className=" mr-2" /> Add To Bookmark
            </button>
        )

}

export default BookmarkButton