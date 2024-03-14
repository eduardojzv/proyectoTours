import Clock from '@/icons/clock';
import Traslate from '@/icons/traslate';
import UserGroup from '@/icons/userGroup';
import { getToursById } from '@/lib/data'
import TourPage from './tourPage';

export default async function TourContainer({id}) {
    const data = await getToursById(id)
    return (
        <TourPage data={data}/>
    )
}

