import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { UserContext } from '../../context/LoggedUserContext';
import { TicketListContext } from '../../context/TicketListContext';
import User from './User';
import TicketsList from './TicketsList';
import Ticket from './Ticket';

const ToDo = (props) => {

    return(
        <UserContext.Consumer>{(userContext => (
            <TicketListContext.Consumer>{(ticktListContext) => {
                const { user } = userContext;
                const { ticket, dispatchTicket } = ticktListContext;
                return (
                    <Grid
                        container
                        direction="row"
                        justify="space-around"
                        alignItems="flex-start"
                    >
                        <Grid item>
                            <User 
                                id={user.id}
                                email={user.email}
                                name={user.name} />
                                
                        </Grid>
                        <Grid item>
                            <TicketsList
                                dispatchTicket={dispatchTicket} />
                        </Grid>
                        <Grid item>
                            <Ticket
                                userId={user.id}
                                userEmail={user.email}
                                ticket={ticket} />
                        </Grid>
                    </Grid>
                );
            }}
            </TicketListContext.Consumer>
        ))}
        </UserContext.Consumer>
    )
};

export default ToDo;