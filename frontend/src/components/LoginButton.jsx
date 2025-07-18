/* eslint-disable no-unused-vars */
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginButton({name, url, type}) {
    
  return (
    <button type={type} onClick={url} >{name}</button>
  )
}
