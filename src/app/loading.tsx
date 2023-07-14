import Loader from '@/components/Loader'
import React from 'react'

export default function loading() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Loader />
    </div>
  )
}
