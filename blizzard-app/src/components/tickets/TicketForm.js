import { useState } from "react"
import "./Tickets.css"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export const TicketForm = () => {
    const [games, setGames] = useState([])
    const [ticket, update] = useState({
        description: "",
        gameId: 0
    })

    const navigate = useNavigate()

    const localBlizzardUser = localStorage.getItem("blizzard_user")
    const blizzardUserObject = JSON.parse(localBlizzardUser)

    useEffect(() => { console.log(games) }, [games])
    useEffect(
        () => {

            fetch('http://localhost:8088/games')
                .then(response => response.json())
                .then((gamesArray) => {
                    setGames(gamesArray)
                })
        },
        []
    )

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

                <label>Game:</label>
                <div className="form-group">

                    <select
                        className="gameSelector"
                        value={games?.id}
                        onChange={
                            (event) => {
                                const copy = { ...ticket }
                                copy.gameId = parseInt(event.target.value)
                                update(copy)
                            }
                        }
                    >
                        <option value="0">Choose...</option>
                        {
                            games.map(game => <option key={`game--${game.id}`} value={game.id}>{game.gameName}</option>)
                        }
                    </select>
                
                </div>
            </fieldset>
            <button className="submitTicket"
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}>
                Submit Ticket
            </button>
        </form >
    )
}