"use client"
import { createContext, useContext, useState } from "react"
/**
 * @param {Object} GlobalContext
 */

const GlobalContext = createContext()

//Creaet A Provide

export const GlobalProvider = ({ children }) => {
    const [unreadCount, setUnreadCount] = useState(0)
    return (
        <GlobalContext.Provider
            value={{
                unreadCount,
                setUnreadCount
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}


//Create custom Hook to access cotnext
export const useGlobalContext = () => {
    return useContext(GlobalContext)
}
