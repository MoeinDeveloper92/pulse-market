"use client"
import React, { useState, useEffect } from 'react'
import { toast } from "react-toastify"
import { useGlobalContext } from '@/context/GlobalContext'

const Message = ({ message }) => {
    const [isDeleted, setIsDeleted] = useState(false)
    const [isRead, setIsRead] = useState(message.read)
    const { setUnreadCount } = useGlobalContext()


    const handleReadClick = async () => {
        try {
            const res = await fetch(`/api/messages/${message._id}`, {
                method: "PUT",
            })
            if (res.status === 200) {
                const { read } = await res.json()
                setIsRead(read)

                if (read) {
                    setUnreadCount((pre) => pre - 1)
                    toast.success("Marked as read!")
                } else {
                    toast.success("marked as new!")
                    setUnreadCount((pre) => pre + 1)
                }
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const handleDeleteClick = async () => {
        try {
            const res = await fetch(`/api/messages/${message._id}`, { method: "DELETE" })

            if (res.status === 200) {
                setIsDeleted(true)
                //when a message gets deleted should on decremented
                setUnreadCount((pre) => pre - 1)
                toast.success("Message Delete!")
            }
        } catch (error) {
            console.log("Something went wrong", error)
            toast.error("Message was not deleted!")
        }
    }
    if (isDeleted) {
        return null
    }
    return <>
        <div
            className="relative bg-white p-4 rounded-md shadow-md border border-gray-200"
        >
            {!isRead && (<div className='absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md'>
                New
            </div>)}
            <h2 className="text-xl mb-4">
                <span className="font-bold">Property Inquiry: {" "}</span>
                {message.property.name}
            </h2>
            <p className="text-gray-700">
                {message.body}
            </p>

            <ul className="mt-4">
                <li><strong>Name:</strong> {message.sender.username}</li>

                <li>
                    <strong>Reply Email:</strong>
                    <a href={`mailto:${message.email}`} className="text-blue-500"
                    >{message.email}
                    </a>

                </li>
                <li>
                    <strong>Reply Phone:</strong>
                    <a href={`tel:${message.phone}`} className="text-blue-500"
                    > {" "}{message.phone}
                    </a>
                </li>
                <li><strong>Received:</strong>{new Date(message.createdAt).toLocaleDateString()}</li>
            </ul>
            <button
                className={`mt-4 mr-3 ${isRead ? "bg-gray-300" : "bg-blue-500 text-white"}  text-white py-1 px-3 rounded-md`}
                onClick={handleReadClick}
            >
                {isRead ? "Mark as new" : "Mark as Read"}
            </button>
            <button
                onClick={handleDeleteClick}
                className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md">
                Delete
            </button>
        </div>
    </>
}

export default Message