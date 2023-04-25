import { useEffect, useState } from "react"
import "./Support.css"
import { Support } from "./Support.js"


export const SupportList = () => {
    const [supports, setSupports] = useState([])


    useEffect(
        () => {
            fetch("http://localhost:8088/users?isStaff=true")
            .then(response => response.json())
            .then((supportsArray) => {
                setSupports(supportsArray)
            })

        },
        []
    )


    return <article className="supports">
        {
            supports.map(support => <Support key={`support--${support.id}`}
                id={support.id} 
                fullName={support.fullName} 
                email={support.email} />)
        }
    </article>
}