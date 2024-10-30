const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null

async function fetchProperties() {
    try {
        //Handle the case whe the Domain is not available yet
        if (!apiDomain) {
            return []
        }
        const res = await fetch(`${apiDomain}/properties`, {
            method: "GET",
        })
        if (!res.ok) {
            throw new Error("Failed to Fetch Data from Server...")
        }
        return res.json()
    } catch (error) {
        console.log("Error Happende:", error)
        return []
    }
}


//Fetch signle property
async function fetchProperty(id) {
    try {
        //Handle the case whe the Domain is not available yet
        if (!apiDomain) {
            return {}
        }
        const res = await fetch(`${apiDomain}/properties/${id}`, {
            method: "GET",
        })
        if (!res.ok) {
            throw new Error("Failed to Fetch Data from Server...")
        }
        return res.json()
    } catch (error) {
        console.log("Error Happende:", error)
        return {}
    }
}

export { fetchProperties, fetchProperty }