
import React from 'react'
import FormToApply from './components/FormToApply';

const page = async ({params}) => {
  const { bid } = await params; 

  return (
    <FormToApply bid={bid}></FormToApply>
  )
}

export default page