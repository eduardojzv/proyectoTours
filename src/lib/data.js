function splitAndLower(array, separator) {
    return array.split(separator).map((item) => item.trim().toLowerCase())
}
export async function getTours(query) {
    //await new Promise((resolve)=>  setTimeout(resolve,3000))
    const urlFilters = Object.entries(query) || []
    try {
        const res = await fetch("http://localhost:3000/api/tours", {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store'
        })
        if (!res.ok) throw new Error()
        const data = await res.json()
        if (urlFilters.length === 0) return data?.data
        let itemValuesTrimmed = []
        const newData = data.data.filter((item) => {
            return urlFilters.every(([key, value]) => {
                const urlValues = splitAndLower(value, "-")
                switch (key) {
                    case "islas":
                        if (item.isla.hasOwnProperty("isla")) {
                            itemValuesTrimmed = item.isla.isla.toLowerCase().trim()
                            return urlValues.includes(itemValuesTrimmed)
                        }
                        break;
                    // case "transportes":
                    //     console.log("III", urlValues);
                    //     itemValuesTrimmed = item.transportes
                    //     break
                    default:
                        return ""
                }
                // if (key === "islas" && item.isla.hasOwnProperty("isla")) {
                //     itemValuesTrimmed = item.isla.isla.toLowerCase().trim()
                // } else {
                //     console.log("III", urlValues);
                //     itemValuesTrimmed = item.transportes
                // }

                //console.log("xxxxxxxxxxxxxxxxxxxxx", itemValuesTrimmed)
                //return urlValues.includes(itemValuesTrimmed)
            });
        });
        return newData
    } catch (error) {
        return { error: 'Error al solicitar los datos' };
    }

}
export async function getToursById(id) {
    try {
        const res = await fetch("http://localhost:3000/api/tours/" + id, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store'
        })
        if (!res.ok) throw new Error()
        const data = await res.json()
        return data?.data
    } catch (error) {
        return { error: 'Error al solicitar los datos' };
    }

}