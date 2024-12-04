'use client'
import React from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import { usePathname } from 'next/navigation'

const override = {
    display: "block",
    margin: "100px auto"
}
const Spinner = ({ loading }) => {

    return (
        <ClipLoader
            color={"#3b82f6"}
            loading={loading}
            cssOverride={override}
            size={150}
            aria-label="Loading spinner"
        />
    )
}

export default Spinner