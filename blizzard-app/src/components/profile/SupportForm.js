import { useEffect, useState } from "react"

export const SupportForm = () => {
    const [profile, updateProfile] = useState({
        specialty: "",
        rate: 0,
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


    useEffect(() => {
        fetch(`http://localhost:8088/supports?userId=${blizzardUserObject.id}`)
            .then(response => response.json())
            .then((data) => {
                const supportObject = data[0]
                updateProfile(supportObject)
            })
    }, [])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()


        fetch(`http://localhost:8088/supports/${profile.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(profile)
        })
            .then(response => response.json())
            .then(() => {
                setFeedback("Support profile successfully saved")
            })
    }

    return (
        <>
            <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
                {feedback}
            </div>
            <form className="profile">
                <h2 className="profile__title">New Service Ticket</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="game">Game:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            value={profile.gameId}
                            onChange={
                                (evt) => {
                                    const copy = { ...profile }
                                    copy.gameId = evt.target.value
                                    updateProfile(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Hourly rate:</label>
                        <input type="number"
                            className="form-control"
                            value={profile.rate}
                            onChange={
                                (evt) => {
                                    const copy = { ...profile }
                                    copy.rate = parseFloat(evt.target.value, 2)
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