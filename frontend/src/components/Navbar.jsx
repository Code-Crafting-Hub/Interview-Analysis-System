/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className='fixed w-full mx-auto rounded-b-2xl bg-white flex justify-between items-center z-10'>
        <div className='space-x-2 py-5 mx-2 md:ms-10 flex gap-4 md:gap-10'>
            <a href="#" className='hover:underline'>Home</a>
            <a href="#" className='hover:underline'>About us</a>
            <a href="#" className='hover:underline'>Reports</a>
        </div>
        <div className='flex '><Link to="/login" className='bg-black text-white px-6 py-2 rounded-full me-2 md:me-10'>login</Link></div>
    </div>
  )
}
