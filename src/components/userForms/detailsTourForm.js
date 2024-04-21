"use client"
import Calendar from '@/icons/calendar';
import UserIcon from '@/icons/userIcon';
import { useFormStore } from '@/storeZustand/formStore';
import { useReservationStore } from '@/storeZustand/reservationStore';
import { clientsQuantityText } from '@/utils/clientsQuantityText';
import { capitalizeFirstLetter } from '@/utils/text/capitalizeFirstLetter';
import { Button, Input } from '@nextui-org/react';
import Image from 'next/image';
export default function DetailsTourForm({ prevPage, nextPage }) {
  const { formContact, formDetail, handleFormsDetails, setCurrentPage, setError } = useFormStore();
  const { reservation } = useReservationStore();
  const clientsQuantity = clientsQuantityText(reservation.clients)

  const handleInputChange = (e, idx, type) => {
    const { name, value } = e.target;
    handleFormsDetails(idx, name, value, type)
  };
  function handleCurrentPage(event, key) {
    if (!event) {
      setCurrentPage(key)
      return null
    }
    event.preventDefault();
    const { state } = formContact
    if (state) {
      setCurrentPage(key)
      setError('')
    } else {
      setError('Formulario "Datos de detalles" incompleto')
    }
  }
  return (
    <>
      {
        Object.keys(reservation).length > 0
          ?
          <div>
            <div className='flex flex-row gap-3 p-1'>
              <span className='w-7 h-7 rounded-full text-center bg-black text-white'>2</span>
              <span>Detalles del tour</span>
            </div>
            <div className='grid grid-cols-4'>
              <div className='bg-red-200 w-full h-36 col-span-1 relative'>
                <Image
                  className="rounded-lg"
                  src={reservation.tourData.islaImg}
                  alt=''
                  fill={true}
                  priority={true}
                  quality={100}
                  sizes="(max-width: 768px) 100vw,700px"
                />
              </div>
              <div className='col-span-3'>
                <h1>{reservation.tourData.titulo}</h1>
                <ul className="list-none">
                  <li className='flex flex-row gap-2'>{<UserIcon style={'w-6 h-6'} />} {clientsQuantity}</li>
                  <li className='flex flex-row gap-2'>{<Calendar style={'w-6 h-6'} />} {reservation.tourDate}</li>
                </ul>
              </div>
            </div>
            {/*Viajeros data*/}
            <form className='mt-3 p-1 bg-white rounded-lg' onSubmit={((event) => handleCurrentPage(event, nextPage))}>
              <ul>
                {
                  reservation.clients
                    ? Object.entries(reservation.clients).map(([key, value], idx) => (
                      <li key={`${key}-${idx}`} className='mb-1'>
                        <span>{`${capitalizeFirstLetter(key)}${value > 1 ? 's' : ''}`}</span>
                        {
                          Array.from({ length: value }).map((_, index) => (
                            <div key={index} className='flex flex-row gap-2'>
                              <Input
                                size='lg'
                                isRequired
                                name="name"
                                variant='underlined'
                                type='text'
                                label="Nombre"
                                placeholder="Digite su nombre"
                                value={formDetail.travellers[key][index].name}
                                onChange={(e) => handleInputChange(e, index, key)}
                              />
                              <Input
                                size='lg'
                                isRequired
                                name="lastName"
                                variant='underlined'
                                type='text'
                                label="Apellido"
                                placeholder="Digite su apellido"
                                value={formDetail.travellers[key][index].lastName}
                                onChange={(e) => handleInputChange(e, index, key)}
                              />
                            </div>
                          ))
                        }
                      </li>
                    ))
                    : null
                }
              </ul>
              <div className='flex justify-end w-2/4 gap-2 mt-9'>
                <Button color="primary" variant="shadow" onClick={(() => handleCurrentPage(undefined, prevPage))}>
                  Volver
                </Button>
                <Button type='submit' color="primary" variant="shadow">
                  Siguiente
                </Button>
              </div>
            </form>
          </div>
          : null
      }
    </>
  )
}
