"use client"
import React, { Fragment } from 'react'
import { SessionProvider } from "next-auth/react"


const AuthProvider = ({ children }) => {
    return (
        <Fragment>
            <SessionProvider>
                {children}
            </SessionProvider>
        </Fragment>
    )
}

export default AuthProvider