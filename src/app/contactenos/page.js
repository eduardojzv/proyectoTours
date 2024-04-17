"use client"
import ContacUsForms from "@/components/userForms/contacUsForms";


export default function Contact() {
  return (
    <div className='grid grid-cols-3 gap-2'>
      {/*col 1*/}
      <div className='col-span-2'>
        <ContacUsForms />
      </div>
      {/*col 2*/}
      <div>
        <ul>
          <li><p> Hable con nosotros por Teléfono, Corre Electrónico o Chat,
            No recibimos llamadas mediante Whatsapp</p></li><br></br>
          <li><p> <strong>Horarios</strong></p>
          </li>
          <li><p> Viernes</p></li><br></br>
        </ul>
        <ul>
          <li><p><strong> Teléfono:  </strong>6175-8264 / 6077-9967</p></li><br></br>
          <li><p> <strong> Whatsapp:  </strong>6175-8264 / 6077-9967</p> </li><br></br>
          <li><span> <strong>email:</strong> <a className="text-blue-600" href="mailto:greenzonetours506@gmail.com">AllBlueTours@gmail.com</a></span></li>
        </ul>
      </div>
    </div>

  )
}
