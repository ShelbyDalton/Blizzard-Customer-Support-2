import { useState } from "react"
import "./Tickets.css"
import { useNavigate } from "react-router-dom"

export const TicketForm = () => {

    const [ticket, update] = useState({
        description: "",
        Game: ""
    })

    const navigate = useNavigate()

    const localBlizzardUser = localStorage.getItem("blizzard_user")
    const blizzardUserObject = JSON.parse(localBlizzardUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        console.log("You clciked the button!")


        const ticketToSendToAPI = {
            userId: blizzardUserObject.id,
            description: ticket.description,
            gameId: ticket.gameId,
            dateCompleted: ""
        }

        return fetch(`http://localhost:8088/helpTickets`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticketToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/tickets")
            })
    }

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">New Help Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brief description of problem"
                        value={ticket.description}
                        onChange={
                            (event) => {
                                const copy = { ...ticket }
                                copy.description = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Game:</label>
                    <input type="radio"
                        value={ticket.gameId}
                        onChange={
                            (event) => {
                                const copy = { ...ticket }
                                copy.gameId = event.target.checked
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button class="submitTicket"
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit Ticket
            </button>
        </form >
    )
}