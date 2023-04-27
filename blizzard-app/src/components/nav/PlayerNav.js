import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"


export const PlayerNav = () => {
    const navigate = useNavigate()


    return (

        <ul className="navbar">
            <img src="blizzlogo.jpg" alt="logo" />
            <li className="navbar__item active">
                <Link className="navbar__link" to="/tickets">Tickets</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/profile">Profile</Link>
            </li>
            {
                localStorage.getItem("blizzard_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("blizzard_user")
                            navigate("/", { replace: true })
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul >
    )
}

