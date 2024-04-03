import TourPage from "@/components/tours/tourPage"
import { getToursById } from "@/lib/data"
export default async function page({params}) {
    const data = await getToursById(params.id)
    return (
        <TourPage data={data}/>
    )
}