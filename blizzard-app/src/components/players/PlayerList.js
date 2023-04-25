import { useEffect, useState } from "react"
import "./Player.css"
import { Player } from "./Player.js"


export const PlayerList = () => {
    const [players, setPlayers] = useState([])


    useEffect(
        () => {
            fetch("http://localhost:8088/users?isStaff=false")
            .then(response => response.json())
            .then((playerArray) => {
                setPlayers(playerArray)
            })

        },
        []
    )

    return <article className="players">
        {
            players.map(player => <Player key={`player--${player.id}`}
                id={player.id} 
                fullName={player.fullName} 
                email={player.email} />)
        }
    </article>
}