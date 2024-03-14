import { useEffect, useState } from "react"
import { getAllTickets } from "./services/ticketServices.jsx"
import "./App.css"


export const App = () => {
const [allTickets, setAllTickets] = useState([])
const [showEmergencyOnly, setShowEmergencyOnly] = useState(false)
const [filteredTickets, setFilteredTickets] = useState([])

useEffect(() => {
  getAllTickets().then((ticketArray) => {
    setAllTickets(ticketArray)
    console.log("TICKETS SET YO")
  })

}, [])


useEffect(() => {
if (showEmergencyOnly) {
  const emergencyTickets = allTickets.filter((ticket) => ticket.emergency === true)
 setFilteredTickets(emergencyTickets) } else { setFilteredTickets(allTickets)}


},[showEmergencyOnly, allTickets])

return (
<div className='tickets-container'>
  <h2>Tickets</h2>
  <div>
    <button className="filer-btn btn-primary" onClick={() => setShowEmergencyOnly(true)}>EMERGENCY</button>
    <button className='filer-btn btn-primary' onClick={() => setShowEmergencyOnly(false)}>SHOW ALL</button>
  </div>
  <article className="tickets">
    {filteredTickets.map(ticket => {
      return (
        <section className='ticket' key={ticket.id}>
          <header className='ticket-info'>#{ticket.id}</header>
          <div>{ticket.description}</div>
          <footer>
            <div>
              <div className='ticket-info'>emergency</div>
              <div>{ticket.emergency ? "yuh" : "naw"}</div>
            </div>
          </footer>
        </section>
      )
    })}
  </article>
</div>
  )
}


