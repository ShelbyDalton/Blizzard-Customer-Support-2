import { Link } from "react-router-dom"


export const Support = ({ id, fullName, email }) => {
    return <section className="support">
        <div>
            <Link to={`/supports/${id}`}>Name: {fullName}</Link>
                        </div>
        <div>Email: {email}</div>
    </section>
}

