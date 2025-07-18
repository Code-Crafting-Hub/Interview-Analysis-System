/* eslint-disable no-unused-vars */
import React from 'react'
import LoginButton from '../components/LoginButton'

export default function Login() {
  return (
    <div className='h-screen flex justify-center items-center'>
        <div className='border-2 p-5 rounded-md shadow-md shadow-black'>
            <p className='pb-2 text-center text-2xl font-semibold'>Login</p>
            <form action="">
                <div className='flex gap-2'>
                    <label htmlFor="">Email:</label>
                    <input type="email" placeholder='Enter your mail id' className='outline-none'/>
                </div>
                <div className='flex gap-2'>
                    <label htmlFor="">Password:</label>
                    <input type="password" placeholder='Password' className='outline-none'/>
                </div>
                <div>
                    <p>Login as:</p>
                    <input type="radio" id='admin' name='login' value="admin" />
                    <label htmlFor="admin">Admin</label>
                    <input type="radio" id='employee' name='login' value="employee" />
                    <label htmlFor="employee">Employee</label>
                </div>
                <div className='text-center'>
                    <LoginButton name="Login"/>
                </div>
            </form>
        </div>
    </div>
  )
}
