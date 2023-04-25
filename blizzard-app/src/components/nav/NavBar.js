import "./NavBar.css"
import { SupportNav } from "./SupportNav"
import { PlayerNav } from "./PlayerNav"

export const NavBar = () => {
    
    const localBlizzardUser = localStorage.getItem("blizzard_user")
    const blizzardUserObject = JSON.parse(localBlizzardUser)

    if (blizzardUserObject.staff) {

        return <SupportNav />
    } else {

        return <PlayerNav /> 
    }
}

