import React from 'react'
import logo from '../../../../public/favicon-32x32.png'
import Image from 'next/image'

const TinyLoader = () => {
  return (
 <div className="flex flex-row gap-2">
  <div className="w-3 h-3 rounded-full bg-blue-500 animate-bounce"></div>
  <div className="w-3 h-3 rounded-full bg-red-500 animate-bounce [animation-delay:-.3s]"></div>
  <div className="w-3 h-3 rounded-full bg-green-500 animate-bounce [animation-delay:-.5s]"></div>
</div>
  )
}

export default TinyLoader