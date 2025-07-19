/* eslint-disable no-unused-vars */
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginButton({name, url, type}) {
    
  return (
    <button type={type} onClick={url} className='py-2 w-[80%] bg-orange-500 rounded-xl hover:cursor-pointer my-4 hover:bg-orange-600 font-semibold'>{name}</button>
  )
}
