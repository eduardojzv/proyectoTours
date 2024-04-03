import { getToursById } from '@/lib/data'
import TourPage from './tourPage';

export default async function TourContainer({id}) {
    const data = await getToursById(id)
    return (
        <TourPage data={data}/>
    )
}

