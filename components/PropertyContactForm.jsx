"use client"
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa'
import { toast } from 'react-toastify'


const PropertyContactForm = ({ property }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [phone, setPhone] = useState("")
    const [wasSubmitted, setWasSubmitted] = useState(false)
    const { data: session } = useSession()


    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            name,
            email,
            message,
            phone,
            recepient: property.owner,
            property: property._id
        }

        try {
            const res = await fetch("/api/messages", {
                method: "POST",
                cache: 'no-cache',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })
            if (res.status === 200) {
                toast.success("Message Sent Sucessfully!")
                setWasSubmitted(true)
            } else if (res.status === 400 || res.status === 401) {
                const dataFromServer = await res.json()

                toast.error(dataFromServer.message)
            } else {
                toast.error("Error sending form!")
            }
        } catch (error) {
            console.log(error)
        } finally {
            setName("")
            setMessage("")
            setPhone("")
            setEmail("")
        }

    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
            {!session ? (<><h1 className='text-center font-light' >You must be logged in to send a message</h1></>) :
                wasSubmitted ? (<p className='text-greent-500 mb-4' >
                    Your message Has been Sent successfully!
                </p>) : (
                    <form onSubmit={handleSubmit}>
                        <div className='mb-4'>
                            <label
                                className='block text-gray-700 text-sm font-bold mb-2'
                                htmlFor='name'
                            >
                                Name:
                            </label>
                            <input
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                id='name'
                                type='text'
                                placeholder='Enter your name'
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="email"
                            >
                                Email:
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='mb-4'>
                            <label
                                className='block text-gray-700 text-sm font-bold mb-2'
                                htmlFor='phone'
                            >
                                Phone:
                            </label>
                            <input
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                id='phone'
                                type='text'
                                placeholder='Enter your phone number'
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="message"
                            >
                                Message:
                            </label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
                                id="message"
                                placeholder="Enter your message"
                            ></textarea>
                        </div>
                        <div>
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
                                type="submit"
                            >
                                <FaPaperPlane className=" mr-2" /> Send Message
                            </button>
                        </div>
                    </form>
                )
            }

        </div >
    )
}

export default PropertyContactForm