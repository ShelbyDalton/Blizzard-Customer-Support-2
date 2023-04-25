
export const TicketSearch = ({setterFunction}) => {

    return (
        <div class="TicketSearch">
        <input class="SearchField"

        onChange={
            (changeEvent) => {
                setterFunction(changeEvent.target.value)
            }
        }

        type="text" placeholder="Enter search terms.." />
        </div>
    )
}