import { Button, Input } from '@nextui-org/react'
import { useFormStore } from '@/storeZustand/formStore';
export default function ContactUserForm({ nextPage }) {
    const { formContact, handleForms, setCurrentPage, setError } = useFormStore()
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        handleForms('formContact', name, value)
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
            <div>
                <div className='flex flex-row gap-3 p-1'>
                    <span className='w-7 h-7 rounded-full text-center bg-black text-white'>1</span>
                    <span>Datos del contacto</span>
                </div>
                <div>
                    <p>Utilizaremos esta información para enviarle la confirmación y novedades acerca de su reserva.</p>
                </div>
            </div>
            <form className='' onSubmit={(e) => handleCurrentPage(e, nextPage)}>
                <div className="grid grid-cols-2 w-full gap-4 p-2">
                    <Input name='name' variant='underlined' type='text' label="Nombre" placeholder="Digite su nombre"
                        value={formContact.name}
                        onChange={handleInputChange}
                        isRequired
                    />
                    <Input type="text" name='lastName' variant='underlined' label="Apellidos" placeholder="Digite sus apellidos"
                        value={formContact.lastName}
                        onChange={handleInputChange}
                        isRequired
                    />
                    <Input name='email' type="email" variant='underlined' label="Email" placeholder="Enter your email"
                        value={formContact.email}
                        onChange={handleInputChange}
                        isRequired
                    />
                    <div className='flex flex-row'>
                        <Input name='phone' type="text" variant='underlined' label="Numero de telefono/celular" placeholder="Digite su numero telefonico/celular"
                            value={formContact.phone}
                            onChange={handleInputChange}
                            isRequired
                        />
                    </div>
                    <div className='flex flex-row'>
                        <Input name='DNI' type="text" variant='underlined' label="Ceduka" placeholder="Digite su cedula"
                            value={formContact.DNI}
                            onChange={handleInputChange}
                            isRequired
                        />
                    </div>
                </div>
                <div className='flex justify-end w-2/4 mt-9'>
                    <Button type='submit' color="primary" variant="shadow">
                        Siguiente
                    </Button>
                </div>
            </form>
        </>
    )
}

