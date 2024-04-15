import ContainerForms from '@/components/userForms/containerForms'
import TourInformation from '@/components/userForms/tourInformation';
export default async function shoppingCart() {
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
