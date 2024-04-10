"use client"
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react'
import UserIcon from '@/icons/userIcon'
import Information from '@/icons/information'
import CartIcon from '@/icons/cartIcon'
import ContactUserForm from './contactUserForm'
import DetailsTourForm from './detailsTourForm'
import CheckOutForms from './checkOutForms'
import { useFormStore } from '@/storeZustand/formStore'
export default function ContainerForms() {
    // const formStore = useStore(useFormStore, (state) => state)
    // const reservationStore = useStore(useReservationStore, (state) => state)
    // if (!(formStore && reservationStore)) return <div></div>
    const { setCurrentPage, currentPage, error } = useFormStore();
    const formsComponent = {
        formContact: {
            text: "Datos del contacto",
            icon: <UserIcon style={'w-4 h-4'} />,
            form: <ContactUserForm nextPage={'formDetail'} />
        },
        formDetail: {
            text: "Detalles del tour",
            icon: <Information style={'w-4 h-4'} />,
            form: <DetailsTourForm prevPage={'formContact'} nextPage={'formCheckOut'} />
        },
        formCheckOut: {
            text: "Pago",
            icon: <CartIcon style={'w-4 h-4'} />,
            form: <CheckOutForms />
        }
    }
    return (
        <div className='flex flex-col gap-2'>
            <div>
                <Breadcrumbs
                    onAction={(key) => setCurrentPage(key)}
                    underline={'active'}
                    variant='bordered'
                    classNames={{
                        list: "bg-slate-500 shadow-small",
                    }}
                    itemClasses={{
                        item: "text-white/60 data-[current=true]:text-white",
                        separator: "text-white/40",
                    }}
                >
                    {Object.entries(formsComponent).map(([key, value]) => (
                        <BreadcrumbItem
                            startContent={value.icon}
                            isCurrent={currentPage === key}
                            key={key}>
                            {value.text}
                        </BreadcrumbItem>
                    ))}
                </Breadcrumbs>
            </div>
            <div className=''>
                <div className='bg-blue-200'>
                    {error.length > 0
                        ?
                        <span key={error}>{error}</span>
                        : null
                    }

                </div>
                {
                    formsComponent[currentPage].form
                }
            </div>
        </div>
    )
}
