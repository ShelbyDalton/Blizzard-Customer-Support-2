import { useEffect, useState } from "react"

export const PlayerForm = () => {
    const [games, setGames] = useState([])
    const [profile, updateProfile] = useState({
        address: "",
        phoneNumber: 0,
        userId: 0
    })

    const localBlizzardUser = localStorage.getItem("blizzard_user")
    const blizzardUserObject = JSON.parse(localBlizzardUser)

    const [feedback, setFeedback] = useState("")

    useEffect(() => {
        if (feedback !== "") {

            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])

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

    useEffect(() => {
        fetch(`http://localhost:8088/players?userId=${blizzardUserObject.id}`)
            .then(response => response.json())
            .then((data) => {
                const playerObject = data[0]
                updateProfile(playerObject)
            })
    }, [])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

      
        fetch(`http://localhost:8088/players/${profile.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(profile)
        })
            .then(response => response.json())
            .then(() => {
                setFeedback("Player profile successfully saved")
            })
    }

    return (
        <>
            <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
                {feedback}
            </div>
            <form className="profile">
            
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="game">Favorite Game:</label>
                        <select
                            className="gameSelector"
                            value={games?.id}
                            onChange={
                                (event) => {
                                    const copy = { ...profile }
                                    copy.gameId = parseInt(event.target.value)
                                    updateProfile(copy)
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
                <fieldset className="rateEntry">
                    <div className="form-group">
                        <label htmlFor="name">Number of years played:</label>
                        <input type="text"
                            className="form-control"
                            value={profile.yearsPlayed}
                            onChange={
                                (evt) => {
                                    const copy = { ...profile }
                                    copy.yearsPlayed = evt.target.value
                                    updateProfile(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <button
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="btn btn-primary">
                    Save Profile
                </button>
            </form>
        </>
    )
}