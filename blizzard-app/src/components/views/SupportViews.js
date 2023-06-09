import { Outlet, Route, Routes } from "react-router-dom"
import { TicketContainer } from "../tickets/TicketContainer"
import { PlayerList } from "../players/PlayerList.js"
import { SupportDetails } from "../supports/SupportDetails.js"
import { SupportList } from "../supports/SupportList.js"
import { PlayerDetails } from "../players/PlayerDetails.js"
import { Profile } from "../profile/Profile.js"
import "./ApplicationViews.css"

export const SupportViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1 className="headline">Blizzard Support 2!</h1>
                 
                    
                    <Outlet />
                </>
            }>

                <Route path="tickets" element={ <TicketContainer /> } />
                <Route path="profile" element={ <Profile /> } />
                <Route path="supports" element={ <SupportList /> } />
                <Route path="supports/:supportId" element={ <SupportDetails /> } />
                <Route path="players" element={ <PlayerList /> } />
                <Route path="players/:playerId" element={ <PlayerDetails /> } />
            </Route>
        </Routes>
    )
}