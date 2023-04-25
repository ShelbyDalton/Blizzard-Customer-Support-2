import { Link } from "react-router-dom"


export const Player = ({ id, fullName, email }) => {
    return <section className="player">
        <div>
            <Link to={`/players/${id}`}>Name: {fullName}</Link>
                        </div>
        <div>Email: {email}</div>
    </section>
}

