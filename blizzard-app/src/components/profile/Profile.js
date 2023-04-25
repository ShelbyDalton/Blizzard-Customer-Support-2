import { PlayerForm } from "./PlayerForm.js"
import { SupportForm } from "./SupportForm.js"
import "./Profile.css"

export const Profile = () => {
    
    const localBlizzardUser = localStorage.getItem("blizzard_user")
    const blizzardUserObject = JSON.parse(localBlizzardUser)

    if (blizzardUserObject.staff) {
        return <SupportForm />
    } else {
        return <PlayerForm />
    }
}

