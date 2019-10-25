export const TicketListReducer = (state, action) => {

    switch (action.type) {
        case 'SHOW_TICKET':
                console.log('state: ', state, 'action: ', action);
                let updatedTicket = { ...state }
                updatedTicket = action.id;
                console.log('updatedTicket: ', updatedTicket);
            return updatedTicket;
            
        default:
            return state;

    }
}