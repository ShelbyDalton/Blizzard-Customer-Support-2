import { Link } from "react-router-dom"
import { getAllTickets } from "./TicketList.js"


export const Ticket = ({ ticketObject, currentUser, supports, getAllTickets }) => {

    let assignedSupport = null

    if (ticketObject.supportTickets.length > 0) {
        const ticketSupportRelationship = ticketObject.supportTickets[0]
        assignedSupport = supports.find(support => support.id === ticketSupportRelationship.supportId)
    }

    const userSupport = supports.find(support => support.userId === currentUser.id)

    const canClose = () => {
        if (userSupport?.id === assignedSupport?.id && ticketObject.dateCompleted === "") {
            return <button onClick={closeTicket} className="ticket__finish">Finish</button>
        } else {
            return ""
        }
    }

 
    const closeTicket = () => {

        const copy = {
            userId: ticketObject.userId,
            description: ticketObject.description,
            gameId: ticketObject.gameId,
            dateCompleted: new Date()
        }


        return fetch(`http://localhost:8088/helpTickets/${ticketObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(copy)
        })
        .then(response => response.json())

        .then(getAllTickets)
    }


    const deleteButton = () => {
        if (!currentUser.staff) {
            return <button onClick={() => {
                fetch(`http://localhost:8088/helpTickets/${ticketObject.id}`, {
                    method: "DELETE"
                })
                    .then(() => {
                        getAllTickets()
                    })
            }} className="ticket__delete">Delete</button>
        } else {
            return ""
        }
    }


    const buttonOrNoButton = () => {
        if (currentUser.staff) {
            return <button className="claimButton"
            onClick = {() => {
                fetch('http://localhost:8088/supportTickets', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        supportId: userSupport.id,
                        helpTicketId: ticketObject.id
                    })
                })
                .then(response => response.json())
                .then(() => {
                    getAllTickets()
                })
            }}
            >Claim</button>
        } else {
            return ""
        }
    }


    return <div className="wholeTicket">
        <header>
            {
                currentUser.staff
                    ? `Ticket ${ticketObject.id}`
                    : <Link to={`/tickets/${ticketObject.id}/edit`}>Ticket {ticketObject.id}</Link>
            }
        </header>
        <section>{ticketObject.description}</section>
        <section>Game: {ticketObject.gameId ? "Diablo" : "Overwatch 2" }</section>
        <footer className="footer">
            {
                ticketObject.supportTickets.length
                ? `Currently being worked on by ${assignedSupport !== null ? assignedSupport?.user?.fullName : ""}`
                : buttonOrNoButton()
            }
            {
                canClose()
            }
            {
                deleteButton()
            }
        </footer>
    </div>
}