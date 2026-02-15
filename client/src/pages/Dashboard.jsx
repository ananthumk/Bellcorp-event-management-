import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Calendar, CalendarCheck, Search } from 'lucide-react'
import { TailSpin } from 'react-loader-spinner'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
import EventCard from '../components/eventCard'
import EventPopup from '../components/EventPopup'

const categories = [
  { value: "", title: "All" },
  { value: "Technology", title: "Technology" },
  { value: "Business", title: "Business" },
  { value: "Education", title: "Education" },
  { value: "Workshop", title: "Workshop" },
  { value: "Seminar", title: "Seminar" },
  { value: "Conference", title: "Conference" },
  { value: "Music", title: "Music" },
  { value: "Sports", title: "Sports" },
  { value: "Health", title: "Health" },
  { value: "Art", title: "Art" },
  { value: "Networking", title: "Networking" },
  { value: "Startup", title: "Startup" },
  { value: "Community", title: "Community" },
  { value: "Online", title: "Online" },
  { value: "Other", title: "Other" }
]


const Dashboard = () => {
  const [loading, setLoading] = useState(true)
  const [events, setEvents] = useState([])
  const [totalEvents, setTotalEvents] = useState(0)

  const [event, setEvent] = useState(null)
  const [showPopup, setShowPopup] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')

  const [locations, setLocations] = useState([])

  const {url, token} = useContext(AppContext)
  console.log(token,url)

  const fetchData = async () => {
    setLoading(true)
     try {
      const endpoint = `${url}/event/?search=${searchTerm}&category=${selectedCategory}&location=${selectedLocation}`
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if(response.status === 200){
        setLoading(false)
        console.log(response.data)
        setEvents(response.data.events)
        setTotalEvents(response.data.total)
        setTotalPages(response.data.totalPages)
        const uniqueLocations = [...new Set(response.data.events.map(event => event.location))]
        setLocations(uniqueLocations)
      } else {
        setLoading(false)
        setEvents([])
        setTotalEvents(0)
        setTotalPages(1)
        setLocations([])
      }
     } catch (error) {
        setLoading(false)   
      setEvents([])
      setTotalEvents(0)
      setTotalPages(1)
      setLocations([])    
     }
  }

  useEffect(() => {
    fetchData()
  }, [url, token, searchTerm, selectedCategory, selectedLocation, currentPage])

  const upcomingEvents = events.filter(event => new Date(event.date) >= new Date())
  const pastEvents = events.filter(event => new Date(event.date) < new Date())

  return (
<>
    <div className="relative">
      <Navbar />
      <div className='w-full h-[90vh] overflow-auto '>
        <div className='w-[95%] mx-auto p-10 flex flex-col gap-5'>
          <h1 className='text-3xl my-2 font-sans font-bold'>Welcome to the Dashboard!</h1>

          <div className='flex items-center gap-3'>
            <div className='flex w-[60%] items-center gap-2 bg-transparent border-1 border-gray-500 rounded-md px-6'>
              <Search className='w-5 h-5 mt-1 text-gray-600' />
              <input
                type="search"
                placeholder='serach events..'
                name="search"
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full bg-transparent font-medium py-2 px-1 border-0 outline-0 text-md text-gray-500' />
            </div>
            <select onChange={(e) => setSelectedCategory(e.target.value)} className='w-[20%] py-2 px-3 outline-0 rounded-md border-1 border-gray-500 text-md font-medium text-black'>

           
              {categories.map(category => (
                <option key={category.value} value={category.value} className='text-sm py-0.5 px-1.5'>{category.title}</option>
              ))}

            </select>

            <select onChange={(e) => setSelectedLocation(e.target.value)} className='w-[20%] py-2 px-3 outline-0 rounded-md border-1 border-gray-500 text-md font-medium text-black'>
              <option value="" className='text-sm py-0.5 px-1.5'>All Location</option>
                
                {locations.map(location => (
                  <option key={location} value={location} className='text-sm py-0.5 px-1.5'>{location}</option>
                ))}

            </select>
          </div>

          {loading && (
            <div className='w-full h-full flex justify-center items-center py-10'>
              <TailSpin
                height="40"
                width="40"
                color="#3b82f6"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          )}    
          
          {!loading && events.length === 0 && (
            <div className='w-full h-full flex flex-col justify-center items-center py-10 gap-3'>
              <h2 className='text-xl font-medium text-gray-500'>No events found</h2>
            </div>
          )}

          {!loading && events.length > 0 && (
            <div className='w-full flex flex-col gap-6'>

            <div className='flex flex-col gap-2'>
              <div className="flex items-center gap-2">
                <Calendar className='w-5 h-5 text-green-600' />
                <h2 className='text-xl font-medium text-gray-700'>Upcoming Events</h2>
              </div>
            <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
               {upcomingEvents.map(event => (
                <EventCard key={event._id} setShowPopup={setShowPopup} setEvent={setEvent} event={event} />
              ))}
            </div>
            </div>

            <div className='flex mt-10 flex-col gap-2'>
              <div className="flex items-center gap-2">
                <CalendarCheck className='w-5 h-5 text-gray-600' />
                <h2 className='text-xl font-medium text-gray-700'>Past Events</h2>
              </div>
            <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
               {pastEvents.map(event => (
                <EventCard key={event._id} setShowPopup={setShowPopup} setEvent={setEvent} event={event} />
              ))}
            </div>
            </div>

            </div>
          )}

          <div className='w-full flex justify-center items-center gap-2 mt-5'>
             <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className='bg-orange-500 cursor-pointer text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-300'>Previous</button>
              <p className='text-gray-500 font-medium'>{currentPage}</p>
             <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)} className='bg-orange-500 cursor-pointer text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-300'>Next</button>
          </div>
          
        </div>
      </div>
    </div>
    {showPopup && <EventPopup event={event} setShowPopup={setShowPopup} />}
</>

  )
}

export default Dashboard
