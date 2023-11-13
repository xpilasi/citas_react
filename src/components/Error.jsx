import React, { useState } from 'react'


const Error = ({mensaje}) => {
  return (
    <div 
    className="bg-red-400 text-white text-center font-bold md:mb-5 md:p-2 uppercase rounded">
        <p>{mensaje}</p>
    </div>
  )
}

export default Error