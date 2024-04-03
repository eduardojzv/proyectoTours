import React from 'react'
import CardTours from './card'
import { getTours } from '@/lib/data'

export default async function ContainerCards({params}) {
  const tours = await getTours(params)
  return (
    <div className="w-full h-auto flex flex-col gap-2">
      {/* <Buscador /> */}
      <div className="p-1 h-full gap-4 grid grid-cols-1  self-center lg:grid-cols-2">
        {tours.map((item, idx) => (
          <CardTours key={`card-${idx}`} item={item} idx={idx} />
        ))}
      </div>
    </div>
  )
}
