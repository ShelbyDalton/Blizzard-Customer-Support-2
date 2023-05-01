import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


export const TicketEdit = () => {
    const [games, setGames] = useState([])
    const [ticket, assignTicket] = useState({
        description: "",
        gameId: ""
    })

    const { ticketId } = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        fetch(`http://localhost:8088/helpTickets/${ticketId}`)
            .then(response => response.json())
            .then((data) => {
                assignTicket(data)
            })
    }, [ticketId])

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

        return fetch(`http://localhost:8088/helpTickets/${ticket.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticket)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/tickets")
            })
    }



    return <form className="ticketForm">
        <h2 className="ticketForm__title">Service Ticket</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                    required autoFocus
                    type="text"
                    style={{
                        height: "10rem"
                    }}
                    className="form-control"
                    value={ticket.description}
                    onChange={
                        (evt) => {
                            const copy = { ...ticket }
                            copy.description = evt.target.value
                            assignTicket(copy)
                        }
                    }>{ticket.description}</textarea>
            </div>
        </fieldset>
        <fieldset className="editTicketCSS">
            {/* <div className="form-group">
                <label htmlFor="name">Game:</label>
                <input type="radio"
                    checked={ticket.gameId}
                    onChange={
                        (evt) => {
                            const copy = { ...ticket }
                            copy.gameId = evt.target.checked
                            assignTicket(copy)
                        }
                    } />
            </div> */}

            <label>Game:</label>
            <div className="form-group"></div>
            {games.map(game => (
            <section key={game.id}>
                {ticket.gameId === game.id ?
                    <label >{game.gameName}</label> : null}
            </section>
        )
        )
        }


        </fieldset>
        <button
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
            Save Edits
        </button>
    </form>
}