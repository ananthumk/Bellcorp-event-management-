// import React, { useContext } from 'react'
// import Navbar from '../components/Navbar'
// import { AppContext } from '../context/AppContext'

// const Event = () => {
//     const [loading, setLoading] = useState(true)
//     const [events, setEvents] = useState([])
//     const [totalEvents, setTotalEvents] = useState(0)

//     const {url, token} = useContext(AppContext)

//     const fetchData = async () => {
//     setLoading(true)
//      try {
//       const endpoint = `${url}/event/?search=${searchTerm}&category=${selectedCategory}&location=${selectedLocation}`
//       const response = await axios.get(endpoint, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       })
//       if(response.status === 200){
//         setLoading(false)
//         console.log(response.data)
//         setEvents(response.data.events)
//         setTotalEvents(response.data.total)
//         const uniqueLocations = [...new Set(response.data.events.map(event => event.location))]
//         setLocations(uniqueLocations)
//       } else {
//         setLoading(false)
//       }
//      } catch (error) {
//         setLoading(false)      
//      }
//   }
//   return (
//     <div>
//       <Navbar /> 

//     </div>
//   )
// }

// export default Event
