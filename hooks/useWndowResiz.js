import { useState, useEffect } from "react";

export function useWindowResize() {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined
    })

    useEffect(() => {
        const detectWindowSize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight })
        }

        window.addEventListener("resize", detectWindowSize)

        detectWindowSize()

        return () => window.removeEventListener("resize", detectWindowSize)
    }, [])


    return windowSize
}