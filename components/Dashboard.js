"use client"
import React, { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { fetchuser, updateProfile } from '@/actions/useractions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify'

const Dashboard = () => {
  const { data: session, update } = useSession()
  const router = useRouter()
  const [form, setform] = useState({})

  useEffect(() => {
    if (!session) {
      router.push('/login')
    }
    else {
      getData()
    }
  }, [router, session])

  const getData = async () => {
    let u = await fetchuser(session.user.name)
    setform(u)
  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    let a = await updateProfile(e, session.user.name)
    toast('Profile Updated!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      });
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
/>
      {/* Same as */}
      <ToastContainer />

      <div className='container text-white  mx-auto py-2'>
        <h2 className='text-center my-2 text-3xl font-bold'>Welcome to your Dashboard</h2>
        <form className="max-w-2xl mx-auto" action={handleSubmit}>
          <div className='my-1'>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-white dark:text-white">Name</label>
            <input value={form.name ? form.name : ""} onChange={handleChange} type="text" name='name' id="name" className="block w-full p-2 bg-gray-900 border border-gray-800 rounded-lg text-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          {/* Input for email  */}
          <div className='my-1'>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-white dark:text-white">Email</label>
            <input value={form.email ? form.email : ""} onChange={handleChange} type="email" name='email' id="email" className="block w-full p-2 bg-gray-900 border border-gray-800 rounded-lg text-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          {/* Input for username  */}
          <div className='my-1'>
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-white dark:text-white">Username</label>
            <input value={form.username ? form.username : ""} onChange={handleChange} type="text" name='username' id="username" className="block w-full p-2 bg-gray-900 border border-gray-800 rounded-lg text-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          {/* Input for profile picture  */}
          <div className='my-1'>
            <label htmlFor="profilepic" className="block mb-2 text-sm font-medium text-white dark:text-white">Profile Picture</label>
            <input value={form.profilepic ? form.profilepic : ""} onChange={handleChange} type="text" name='profilepic' id="profilepic" className="block w-full p-2 bg-gray-900 border border-gray-800 rounded-lg text-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          {/* Input for cover picture  */}
          <div className='my-1'>
            <label htmlFor="coverpic" className="block mb-2 text-sm font-medium text-white dark:text-white">Cover Picture</label>
            <input value={form.coverpic ? form.coverpic : ""} onChange={handleChange} type="text" name='coverpic' id="coverpic" className="block w-full p-2 text-gray-50 border border-gray-800 rounded-lg bg-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          {/* Input for razorpay id  */}
          <div className='my-1'>
            <label htmlFor="razorpayid" className="block mb-2 text-sm font-medium text-white dark:text-white">Razorpay ID</label>
            <input value={form.razorpayid ? form.razorpayid : ""} onChange={handleChange} type="text" name='razorpayid' id="razorpayid" className="block w-full p-2 bg-gray-900 border border-gray-800 rounded-lg text-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          {/* Input for razorpay secret  */}
          <div className='my-1'>
            <label htmlFor="razorpaysecret" className="block mb-2 text-sm font-medium text-white dark:text-white">Razorpay Secret</label>
            <input value={form.razorpaysecret ? form.razorpaysecret : ""} onChange={handleChange} type="text" name='razorpaysecret' id="razorpaysecret" className="block w-full p-2 bg-gray-900 border border-gray-800 rounded-lg text-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          {/* Submit Button  */}
          <div className='my-6'>
            <button type="submit" className="block w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Save</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Dashboard
