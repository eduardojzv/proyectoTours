import { sendEmail } from '@/lib/serverActions';
import { Button, Input, Textarea } from '@nextui-org/react'
import { useState } from 'react';
export default function ContacUsForms() {
    const [formContact, setFormContact] = useState({
        phone: '',
        email: '',
        lastName: '',
        name: '',
        description: ''
    });
    function clearForm() {
        setFormContact({
            phone: '',
            email: '',
            lastName: '',
            name: '',
            description: ''
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormContact({
            ...formContact,
            [name]: value
        });
    };
    return (
        <div className='p-2'>
            <div className='text-center'>
                <h1>¿TIENES PREGUNTAS SOBRE NUESTROS SERVICIOS?</h1>
                <p>En AllBlue Tours Costa Rica estamos dedicados a servir a nuestros clientes con el máximo servicio personalizado
                    y nos esforzamos por lograr la satisfacción total del cliente con todos nuestros servicios.
                    Si desea obtener más información sobre cualquiera de nuestros servicios, no dude en llamarnos o enviarnos un correo electrónico.</p><br></br>
            </div>
            <form className='' action={() => sendEmail(formContact)}>
                <div className="grid grid-cols-1 w-full gap-4 p-2">
                    <Input name='name' variant='flat' type='text' label="Nombre" placeholder="Digite su nombre"
                        value={formContact.name}
                        onChange={handleInputChange}
                        isRequired
                    />
                    <Input type="text" name='lastName' variant='flat' label="Apellidos" placeholder="Digite sus apellidos"
                        value={formContact.lastName}
                        onChange={handleInputChange}
                        isRequired
                    />
                    <Input name='email' type="email" variant='flat' label="Email" placeholder="Digite tu correo"
                        value={formContact.email}
                        onChange={handleInputChange}
                        isRequired
                    />
                    <Input name='phone' type="text" variant='flat' label="Numero de telefono/celular" placeholder="Digite su numero telefonico/celular"
                        value={formContact.phone}
                        onChange={handleInputChange}
                        isRequired
                    />
                    <Textarea
                        name='description'
                        label="Mensaje :"
                        labelPlacement="outside"
                        placeholder="Escribe tu Consulta"
                        className=""
                        value={formContact.description}
                        onChange={handleInputChange}
                        isRequired
                    />
                </div>
                <div className='flex justify-end w-2/4'>
                    <Button type='submit' color="primary" variant="shadow">
                    Enviar
                </Button>
        </div>
            </form >
        </div >
    )
}

