import { SupportViews } from "./SupportViews"
import { PlayerViews } from "./PlayerViews"

export const ApplicationViews = () => {

    const localBlizzardUser = localStorage.getItem("blizzard_user")
    const blizzardUserObject = JSON.parse(localBlizzardUser)

    if (blizzardUserObject.staff) {
        return <SupportViews />
    } else {
        return <PlayerViews /> 
    }
}