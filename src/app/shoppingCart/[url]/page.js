import ContainerForms from '@/components/userForms/containerForms'
import TourInformation from '@/components/userForms/tourInformation';
<<<<<<< HEAD
export default async function shoppingCart({ params }) {
=======
export default async function shoppingCart() {
>>>>>>> 0530fe3b3d2e7a2f5d4ca8d7a767b5b39e319852
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
