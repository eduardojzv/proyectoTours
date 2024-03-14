import TourContainer from '@/components/tours/tourContainer'
import TourPage from '@/components/tours/tourPage'
import React from 'react'

export default function page({params}) {
  return (
    <TourContainer id={params.id}/>
    // <TourPage id={params.id}/>
  )
}
