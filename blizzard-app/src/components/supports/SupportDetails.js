import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


export const SupportDetails = () => {
    const { supportId } = useParams()
    const [support, updateSupport] = useState({})

    const [games, setGames] = useState([])

    useEffect(
        () => {

            fetch('http://localhost:8088/games')
                .then(response => response.json())
                .then((gamesObject) => {
                    setGames(gamesObject)
                })
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/supports?_expand=user&_embed=supportTickets&userId=${supportId}`)
                .then(response => response.json())
                .then((data) => {
                    const singleSupport = data[0]
                    updateSupport(singleSupport)
                })
            
        },
        [supportId]
    )

 
    return <section className="support">

        <header className="support_header">{support?.user?.fullName}</header>
        <div>Email: {support?.user?.email}</div>
        <div>Game: {games.map(game => (
            <section key={game.id}>
                {support.gameId === game.id ?
                    <label >{game.gameName}</label> : null}
            </section>
        )
        )
        }</div>
        <div>Rate: {support.rate}</div>
        <footer className="support_footer">Currently working on {support?.supportTickets?.length} tickets</footer>
    </section>
}