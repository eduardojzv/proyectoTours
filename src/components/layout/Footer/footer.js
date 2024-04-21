import { IconHeader } from '@/icons/IconHeader';
import React from 'react'

export default function Footer() {
    return (
        <footer className="bg-gray-100 p-6 mt-12">
            <div className="max-w-3xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <h3 className="text-lg font-bold mb-2">Contáctanos</h3>
                        <p className="text-gray-600"><strong>Teléfono:</strong> <span className="font-bold">6175-8264 / 6077-9967</span></p>
                        <p className="text-gray-600"><strong>Horario de atención:</strong> Lunes a Viernes de 9:00 am a 5:00 pm</p>
                        <p className="text-gray-600"><strong>Dirección:</strong> [Dirección de tu empresa]</p>
                        <p className="text-gray-600"><strong>Correo: </strong><a href="mailto:allbluetours506@gmail.com" className="text-blue-500">allbluetours506@gmail.com</a></p>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-2">Enlaces útiles</h3>
                        <ul>
                            <li><a href="/policies&private" className="text-blue-600 hover:underline">Política de Privacidad</a></li>
                            <li><a href="/terms&conditions" className="text-blue-600 hover:underline">Términos y Condiciones</a></li>
                            <li><a href="/frequentquestions" className="text-blue-600 hover:underline">Preguntas Frecuentes</a></li>
                        </ul>
                    </div>
                    <div>
                      <a href="/" ><IconHeader w={80} h={80} /></a>
                    </div>
                </div>
                <div className="text-center mt-4">
                    <p className="text-gray-600">© 2024 AllBlue Tours. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
