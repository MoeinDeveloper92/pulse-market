//these are env var, and that is possible not to be added in  deployued version
const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null


//htese are fcntions we call either in cleint side or server side
async function fetchProperties() {
    try {
        //Handle the case whe the Domain is not available yet
        if (!apiDomain) {
            return []
        }
        //this is the api already created
        const res = await fetch(`${apiDomain}/properties`, {
            method: "GET",
            cache: "no-store"
        })
        if (!res.ok) {
            throw new Error("Failed to Fetch Data from Server...")
        }
        //it returns an array
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