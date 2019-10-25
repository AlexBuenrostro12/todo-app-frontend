import React, { createContext, useReducer } from 'react';
import { TicketListReducer } from '../reducers/TicketListReducer';

export const TicketListContext = createContext();

const TicketListProvider = (props) => {
    const [ticket, dispatchTicket] = useReducer(TicketListReducer, null);

    return (
        <TicketListContext.Provider value={{ 
            ticket, 
            dispatchTicket, 
        }}>
            {props.children}
        </TicketListContext.Provider>
    );
};

export default TicketListProvider;