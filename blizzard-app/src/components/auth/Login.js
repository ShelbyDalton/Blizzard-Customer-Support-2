import { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Login.css"


export const Login = () => {
    const [email, set] = useState("sdalton@blizzard.org")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("blizzard_user", JSON.stringify({
                        id: user.id,
                        staff: user.isStaff
                    }))

                    navigate("/")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return (
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1 className="loginHeader">Blizzard Support 2!</h1>
                    <h2 className="loginTagline">Please sign in</h2>
                    <fieldset className="emailInput">
                        <label htmlFor="inputEmail"> Email address </label>
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset className="loginButtonCss">
                        <button className="loginButton" type="submit">
                            Sign in
                        </button>
                    </fieldset>
                    <section className="link--register">
                        <Link to="/register">I don't have an account yet</Link>
                    </section>
                </form>
            </section>
        </main>
    )
}

