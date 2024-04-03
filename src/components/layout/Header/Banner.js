import Image from 'next/image'
import React from 'react'

export default function Banner() {
  return (
    <div className='bg-slate-500 w-full h-96 relative'>
      <Image
        alt="vercel"
        fill
        src={"/banner/tortuga.webp"}
        sizes="100vw"
        quality={100}
        style={{
          objectFit:'cover'
        }}
      />
    </div>
  )
}
