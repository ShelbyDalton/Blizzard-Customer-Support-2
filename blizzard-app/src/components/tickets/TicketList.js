import { useEffect, useState } from "react"
import "./Tickets.css"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { Ticket } from "./Ticket"


export const TicketList = ({ searchTermState }) => {

    const [tickets, setTickets] = useState([])
    const [supports, setSupports] = useState([])
    const [filteredTickets, setFiltered] = useState([])
    const [games, setGames] = useState([])
    const [openOnly, updateOpenOnly] = useState(false)
    
    const navigate = useNavigate()

    const localBlizzardUser = localStorage.getItem("blizzard_user")
    const blizzardUserObject = JSON.parse(localBlizzardUser)


    useEffect(
        () => {
            const searchedTickets = tickets.filter(ticket => {
                return ticket.description.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setFiltered(searchedTickets)
        },
        [searchTermState]
    )

    useEffect(
        () => {
            getAllTickets()

            fetch('http://localhost:8088/supports?_expand=user')
                .then(response => response.json())
                .then((supportArray) => {
                    setSupports(supportArray)
                })

            console.log("Initial state of tickets", tickets) 
        },
        [] 
    )

 
    useEffect(
        () => {
            if (blizzardUserObject.staff) {
                setFiltered(tickets)
            } else {
                const myTickets = tickets.filter(ticket => ticket.userId === blizzardUserObject.id)
                setFiltered(myTickets)
            }

        },
        [tickets]
    )


    useEffect(
        () => {
            if (openOnly) {
                const openTicketArray = tickets.filter(ticket => {
                    return ticket.userId === blizzardUserObject.id && ticket.dateCompleted === ""
                })
                setFiltered(openTicketArray)
            } else {
                const myTickets = tickets.filter(ticket => ticket.userId === blizzardUserObject.id)
                setFiltered(myTickets)
            }

        },
        [openOnly]
    )


    const getAllTickets = () => {
        fetch('http://localhost:8088/helpTickets?_embed=supportTickets')
                    .then(response => response.json())
                    .then((ticketArray) => {
                        setTickets(ticketArray)
                    })
    }


    return <>
        {
            blizzardUserObject.staff
                ? <>
                    {/* <button class="emergencyButton" onClick={() => { setEmergency(true) }}>Emergency Tickets Only</button> */}
                    {/* <button class="showAllButton" onClick={() => { setEmergency(false) }}>Show All Tickets</button> */}
                </>
                : <>
                    <button class="createTicket" onClick={() => navigate("/ticket/create")}>Create Ticket</button>
                    <button class="createTicket" onClick={() => updateOpenOnly(true)}>Open Tickets</button>
                    <button class="createTicket" onClick={() => updateOpenOnly(false)}>All My Tickets</button>
                </>
        }

        <h2 className="listTitle">List of Tickets</h2>
        <article className="tickets">
            {
                filteredTickets.map(
                    (ticket) => <Ticket 
                    supports={supports} 
                    getAllTickets={getAllTickets}
                    currentUser={blizzardUserObject} 
                    ticketObject={ticket}
                    gamesObject={games} />
                )
            }
        </article>
    </>
}