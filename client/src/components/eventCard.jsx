import { ArrowRight, CalendarDays, MapPin } from 'lucide-react'
import React from 'react'


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


const eventCard = ({ key, setShowPopup, setEvent, event }) => {
    return (
        <div key={key} className='bg-white rounded-sm shadow-lg p-3 flex flex-col gap-2'>
            <div className='w-full flex justify-between items-center'>
                <h2 className='text-[15px] font-medium'>{event.name}</h2>
                <button disabled className={`text-sm ${categoryColors[event.category] || categoryColors["Other"]} py-0.5 px-1 rounded-md`}>{event.category}</button>
            </div>
            <div className='flex items-center gap-3'>
                <div className='flex items-center gap-1'>
                    <MapPin className='w-3 h-3 text-gray-500' />
                    <p className='text-sm text-gray-500'>{event.location}</p>
                </div>
                <div className='flex items-center gap-1'>
                    <CalendarDays className='w-3 h-3 text-gray-500' />
                    <p className='text-sm text-gray-500'>{new Date(event.date).toLocaleDateString()}</p>
                </div>
            </div>
            <p onClick={() => {setShowPopup(true); setEvent(event)}} className='text-sm text-orange-400 hover:text-orange-600 hover:underline hover:font-medium cursor-pointer'>Click to register <ArrowRight className="w-3 h-3 inline" /></p>
        </div>
    )
}

export default eventCard
