import React from 'react'
import UserDetails from './UserDetails';



const page = async({ params }) => {
    const { id } = await params;
  return (
   <UserDetails id={id}></UserDetails>
  )
}

export default page