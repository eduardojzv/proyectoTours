import ContainerForms from '@/components/userForms/containerForms'
import TourInformation from '@/components/userForms/tourInformation';
export default async function shoppingCart() {
  return (
    <div className='grid grid-cols-1 gap-2 lg:grid-cols-3 bg-white'>
      {/*col 1*/}
      <div className='col-span-2 order-last lg:order-first'>
        <ContainerForms />
      </div>
      {/*col 2*/}
      <div className='col-span-1 lg:col-span-1'>
        <TourInformation />
      </div>
    </div>
  )
}
