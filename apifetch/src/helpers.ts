export const fetchData = async <T>(url: string): Promise<T | Error> => {
    const response = await fetch(url)
    if(!response.ok){
        console.log("Fetch error: ", response.status)
        return new Error("Fetch failed: " + response.status)
    }
    const json: T = await response.json()
    return json
}