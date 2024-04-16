import { Button, Input, Textarea } from '@nextui-org/react'
import { useFormStore } from '@/storeZustand/formStore';
export default function ContacUsForms({ nextPage }) {
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
                    <span>Datos del Cliente</span>
                </div>
                <div>
                    <h1>¿TIENES PREGUNTAS SOBRE NUESTROS SERVICIOS?</h1>
                    <p>En ILT Costa Rica estamos dedicados a servir a nuestros clientes con el máximo servicio personalizado <br></br>
                        y nos esforzamos por lograr la satisfacción total del cliente con todos nuestros servicios. <br></br>
                        Si desea obtener más información sobre cualquiera de nuestros servicios, no dude en llamarnos o enviarnos un correo electrónico.</p><br></br>
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
                    <Input name='email' type="email" variant='underlined' label="Email" placeholder="Digite tu correo"
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
                        <Textarea
                            isRequired
                            label="Mensaje:"
                            labelPlacement="outside"
                            placeholder="Escribe tu Consulta"
                            className="max-w-xs"
                        />
                    </div>
                </div>
                <div className='flex justify-end w-2/4'>
                    <Button type='submit' color="primary" variant="shadow">
                        Enviar
                    </Button>
                </div>
            </form>
        </>
    )
}

