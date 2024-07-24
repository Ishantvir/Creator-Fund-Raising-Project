"use client"
import React from 'react'
import Script from 'next/script'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { fetchuser, fetchpayments, initiate } from '@/actions/useractions'
import { useSearchParams } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify'

const PaymentPage = ({ username }) => {
    // const {data: session} = useSession()

    const [paymentform, setPaymentform] = useState({name: "",message: "", amount: ""})
    const [currentUser, setcurrentUser] = useState({})
    const [payments, setPayments] = useState([])
    const searchParams = useSearchParams()

    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const getData = async (params) => {
        let u = await fetchuser(username)
        setcurrentUser(u)
        let dbpayments = await fetchpayments(username)
        setPayments(dbpayments)
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (searchParams.get("paymentdone") == "true") {
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
    }, [])

    const pay = async (amount) => {
        //Get the order id
        let a = await initiate(amount, username, paymentform)
        let orderId = a.id
        var options = {
            "key": currentUser.razorpayid, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Get Me A Chai", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        }
        var rzp1 = new Razorpay(options);
        rzp1.open();
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
                theme="light" />
            {/* Same as */}
            <ToastContainer />
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div className='cover relative'>
                <img className='object-cover w-full' src={currentUser.coverpic} alt="fromPatreonBen" />
                <div className='absolute -bottom-[62px] right-[44.5%]'>
                    <img width={140} height={140} className='rounded-full' src={currentUser.profilepic} alt="fromPatreonBen" />
                </div>
            </div>
            <div className="info flex flex-col gap-2 justify-center items-center py-20">
                <div className='font-bold text-lg'>
                    @{username}
                </div>
                <div className='text-slate-400'>
                    Lets help {username} to get a chai!
                </div>
                <div className='flex gap-8 text-slate-200'>
                    {payments.length} Payments . ₹{payments.reduce((a,b) => a + b.amount, 0)} raised
                </div>
                <div className="payment flex gap-3 w-[80%] mt-11">
                    <div className="supports bg-slate-900 w-1/2 rounded-lg p-5 ">
                        {/* show list of all the supports as a leaderboard */}
                        <h2 className='text-xl font-bold my-5'>Supports</h2>
                        <ul className='mx-5 text-sm'>
                            {payments.length == 0 && <li>No payments yet</li>}
                            {payments.map((p, i) => {
                                return <li key={i} className='my-5 flex gap-2 items-center'>
                                    <img width={27} className='bg-slate-200 p-[1px] rounded-full' src="/user.gif" alt="user avatar" />
                                    <span>
                                        {p.name} donated <span className='font-bold'>₹{p.amount}</span> with a message "{p.message}"
                                    </span>
                                </li>
                            })}

                        </ul>
                    </div>
                    <div className="makePayment bg-slate-900 w-1/2 rounded-lg p-10">
                        <h2 className='text-xl font-bold my-5'>Make a Payment</h2>
                        <div className='flex flex-col gap-2'>
                            {/* input for name and message */}
                            <input type="text" onChange={handleChange} value={paymentform.name} name='name' className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Name' />
                            <input type="text" onChange={handleChange} value={paymentform.message} name='message' className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Message' />
                            <input type="text" onChange={handleChange} value={paymentform.amount} name='amount' className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Amount' />
                            <button onClick={() => { pay(Number.parseInt(paymentform.amount) * 100) }} type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:bg-slate-600 disabled:from-purple-100" disabled={paymentform.name?.length < 3 || paymentform.message?.length < 4 || paymentform.amount?.length < 1}>Pay</button>
                        </div>
                        {/* or choose from these amounts */}
                        <div className='flex gap-2 mt-5'>
                            <button className='bg-slate-800 p-3 rounded-lg' onClick={() => { pay(1000) }}>Pay ₹10</button>
                            <button className='bg-slate-800 p-3 rounded-lg' onClick={() => { pay(2000) }}>Pay ₹20</button>
                            <button className='bg-slate-800 p-3 rounded-lg' onClick={() => { pay(3000) }}>Pay ₹30</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage
