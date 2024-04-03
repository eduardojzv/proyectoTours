import ContainerForms from '@/components/userForms/containerForms'
import TourInformation from '@/components/userForms/tourInformation';
import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
export default async function shoppingCart({ params }) {
  const cookieStore = cookies().get('temporalURL')
  const secret=process.env.COOKIE_SECRET
  // console.log("cookieStore",cookieStore);
  // if (cookieStore) {
  //   const cookie=verify(cookieStore.value,secret)
  // }
  return (
    <div className='grid grid-cols-3 gap-2'>
      {/*col 1*/}
      <div className='col-span-2'>
        <ContainerForms />
      </div>
      {/*col 2*/}
      <div className='grid grid-cols-4'>
        <TourInformation />
      </div>
    </div>
  )
}
