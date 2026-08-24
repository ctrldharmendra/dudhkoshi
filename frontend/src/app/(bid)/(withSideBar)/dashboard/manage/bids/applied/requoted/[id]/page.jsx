




import React from 'react'

const page = async ({ params }) => {

  const { id } = await params;

  console.log(id); 


  return (
    <div> Bidid {id}</div>
  )
}

export default page