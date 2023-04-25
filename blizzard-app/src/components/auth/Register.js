import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"

// Register function (also provided) which will add user to users, trouble is that it does not add
// a newly registered employee to the employees data in database, must manually add to employees. 
export const Register = () => {
    const [player, setPlayer] = useState({
        email: "",
        fullName: "",
        isStaff: false
    })
    let navigate = useNavigate()

    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(player)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("blizzard_user", JSON.stringify({
                        id: createdUser.id,
                        staff: createdUser.isStaff
                    }))

                    navigate("/")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${player.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updatePlayer = (evt) => {
        const copy = {...player}
        copy[evt.target.id] = evt.target.value
        setPlayer(copy)
    }

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for Blizzard Support:</h1>
                <fieldset>
                    <label htmlFor="fullName"> Full Name </label>
                    <input onChange={updatePlayer}
                           type="text" id="fullName" className="form-control"
                           placeholder="Enter your name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updatePlayer}
                        type="email" id="email" className="form-control"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <input onChange={(evt) => {
                        const copy = {...player}
                        copy.isStaff = evt.target.checked
                        setPlayer(copy)
                    }}
                        type="checkbox" id="isStaff" />
                    <label htmlFor="email"> I work for Blizzard </label>
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}

