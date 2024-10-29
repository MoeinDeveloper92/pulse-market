import React from 'react'
import Link from 'next/link'


const HomePage = () => {
    return (
        <div>
            <h1 className="text-3xl">
                Welcome
                <Link href={"/properties"}>
                    Show Properties
                </Link>
            </h1>
        </div>
    )
}

export default HomePage