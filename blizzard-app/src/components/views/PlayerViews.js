import { Outlet, Route, Routes } from "react-router-dom"
import { TicketForm } from "../tickets/TicketForm"
import { TicketList } from "../tickets/TicketList"
import { Profile } from "../profile/Profile"
import { TicketEdit } from "../tickets/TicketEdit"

export const PlayerViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Blizzard Support 2!</h1>
                    <div>We thought we would try a version 2 of support since Overwatch 2 was so well liked!</div>

                    <Outlet />
                </>
            }>

                <Route path="tickets" element={ <TicketList /> } />
                <Route path="ticket/create" element={<TicketForm />} />
                <Route path="profile" element={ <Profile /> } />
                <Route path="tickets/:ticketId/edit" element={ <TicketEdit /> } />
            </Route>
        </Routes>
    )
}