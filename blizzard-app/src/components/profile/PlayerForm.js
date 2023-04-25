import { useEffect, useState } from "react"

export const PlayerForm = () => {
 
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
                <h2 className="profile__title">New Help Ticket</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="game">Address:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            value={profile.address}
                            onChange={
                                (evt) => {
                                    const copy = { ...profile }
                                    copy.address = evt.target.value
                                    updateProfile(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Phone number:</label>
                        <input type="text"
                            className="form-control"
                            value={profile.phoneNumber}
                            onChange={
                                (evt) => {
                                    const copy = { ...profile }
                                    copy.phoneNumber = evt.target.value
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