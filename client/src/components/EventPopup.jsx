import { CalendarDays, User, X, LoaderCircle } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'

const categoryColors = {
    Technology: "bg-blue-100 text-blue-700",
    Business: "bg-green-100 text-green-700",
    Education: "bg-purple-100 text-purple-700",
    Workshop: "bg-yellow-100 text-yellow-700",
    Seminar: "bg-pink-100 text-pink-700",
    Conference: "bg-indigo-100 text-indigo-700",
    Music: "bg-red-100 text-red-700",
    Sports: "bg-orange-100 text-orange-700",
    Health: "bg-emerald-100 text-emerald-700",
    Art: "bg-fuchsia-100 text-fuchsia-700",
    Networking: "bg-cyan-100 text-cyan-700",
    Startup: "bg-lime-100 text-lime-700",
    Community: "bg-teal-100 text-teal-700",
    Online: "bg-sky-100 text-sky-700",
    Other: "bg-gray-100 text-gray-700"
}

const EventPopup = ({ event, setShowPopup }) => {

    const [errMsg, setErrMsg] = useState(null)
    const [msg, setMsg] = useState(null)

    const { url, token } = useContext(AppContext)

    const [registering, setRegistering] = useState(false)

    const handleRegistration = async () => {
        try {
            setRegistering(true)
            const response = await axios.post(`${url}/registration/register/${event._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status === 201) {
                setRegistering(false)
                setMsg('Successfully registered for the event!')
                setErrMsg(null)
                setTimeout(() => {
                    setShowPopup(false)
                }, 2000)
            } else {
                setRegistering(false)
                setErrMsg(response.data.message)
                setMsg(null)
                console.log(response)
            }
        } catch (error) {
            setRegistering(false)
            setErrMsg('Failed to register for the event.')
            setMsg(null)
            console.log(error)
        }
    }

    return (
        <div className='w-full fixed inset-0 z-50 h-screen bg-[rgba(0,0,0,0.5)] flex justify-center items-center'>
            <div className='bg-white w-[60%] rounded-md flex flex-col gap-2 py-5 px-7'>

                <button onClick={() => setShowPopup(false)} className='self-end cursor-pointer text-gray-500 hover:text-gray-700'><X className='w-5 h-5 text-gray inline' />
                </button>

                <div className='flex items-center gap-3'>
                    <h2 className='text-xl font-medium'>{event.name}</h2>
                    <button disabled className={`text-sm ${categoryColors[event.category] || categoryColors["Other"]} py-0.5 px-1 rounded-md`}>{event.category}</button>
                </div>

                <p className='text-sm text-gray-500'>{event.description}</p>

                <div className='bg-[#f5f1d8] flex items-center gap-10 py-2 px-4 w-full rounded-md'>

                    <div className='flex flex-col gap-1'>
                        <div className='flex items-center gap-1'>
                            <CalendarDays className='w-4 h-4 text-gray-500' />
                            <p className='text-sm text-gray-500'>Date</p>
                        </div>
                        <p className='text-sm font-medium text-gray-500'>{new Date(event.date).toLocaleDateString()}</p>

                    </div>

                    <div className='flex flex-col gap-1'>
                        <div className='flex items-center gap-1'>
                            <User className='w-4 h-4 text-gray-500' />
                            <p className='text-sm text-gray-500'>Capacity</p>
                        </div>
                        <p className='text-sm font-medium text-gray-500'>{event.capacity}</p>

                    </div>


                </div>

                <div className='flex items-center gap-3 w-full border-1 border-gray-400 rounded-md py-2 px-4'>
                    <div className='bg-[#f0a26f] rounded-full p-1.5'>
                        <User className='w-5 h-5 text-white' />
                    </div>
                    <div className='flex flex-col'>
                        <p className='text-sm text-gray-500'>Organized by</p>
                        <p className='text-black font-medium text-md'>{event.organizer}</p>
                    </div>
                </div>

                {registering ? (
                    <button disabled className='w-full max-w-[180px] flex justify-center items-center gap-2 bg-orange-400 text-white py-2 rounded-md mt-3 cursor-not-allowed'>
                        <LoaderCircle className="animate-spin w-4 h-4" /> Registering...
                    </button>
                    )
                    : (
                        <button onClick={handleRegistration} className='w-full max-w-[180px] hover:font-medium cursor-pointer bg-orange-500 text-white py-2 rounded-md mt-3 hover:bg-orange-600 transition duration-300'>
                            Register Now
                        </button>
                    )}

                {msg && <p className='text-green-500 text-sm mt-2'>{msg}</p>}
                {errMsg && <p className='text-red-500 text-sm mt-2'>{errMsg}</p>}
            </div>
        </div>
    )
}

export default EventPopup
