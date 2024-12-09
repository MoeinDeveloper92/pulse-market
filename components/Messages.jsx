"use client"
import React, { useState, useEffect } from 'react'
import Spinner from '@/components/Spinner'
import Message from './Message'
import { SP } from 'next/dist/shared/lib/utils'

const Messages = () => {
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await fetch("/api/messages")
                if (res.status === 200) {
                    const data = await res.json()
                    setMessages(data)
                    setLoading(false)
                }
            } catch (error) {
                setLoading(false)
                console.log("Error Fetching Messages", error)
            } finally {
                setLoading(false)
            }
        }

        fetchMessages()
    }, [])


    return loading ? (<Spinner />) : (
        <section className="bg-blue-50">
            <div className="container m-auto py-24 max-w-6xl">
                <div
                    className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
                >
                    <h1 className="text-3xl font-bold mb-4">Your Messages</h1>

                    <div className="space-y-4">
                        {messages.length === 0 ? (<p>you have no messages</p>) : (
                            messages.map((message) => (
                                <Message
                                    message={message}
                                    key={message._id}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Messages