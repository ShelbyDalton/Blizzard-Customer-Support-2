import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


export const PlayerDetails = () => {
    const { playerId } = useParams()
    const [player, updatePlayer] = useState({})

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
            fetch(`http://localhost:8088/players?_expand=user&_embed=playerTickets&userId=${playerId}`)
                .then(response => response.json())
                .then((data) => {
                    const singlePlayer = data[0]
                    updatePlayer(singlePlayer)

                })
        },
        [playerId]
    )


    return <section className="player">

        <header className="player_header">{player?.user?.fullName}</header>
        <div>Email: {player?.user?.email}</div>
        <div>Favorite Game: {games.map(game => (
            <section key={game.id}>
                {player.gameId === game.id ?
                    <label >{game.gameName}</label> : null}
            </section>
        )
        )
        }</div>
        <div>Years Played: {player.yearsPlayed}</div>
    </section>
}