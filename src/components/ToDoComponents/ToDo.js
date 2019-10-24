import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Button, TextField, Grid } from '@material-ui/core';
import { UserContext } from '../../context/LoggedUserContext';
import User from './User';
import TicketsList from './TicketsList';

const styles = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: '2rem',
    },
});

const ToDo = (props) => {
    const classes = styles();
    const [refreshList, setRefreshList] = useState(false);

    return(
        <UserContext.Consumer>{(context => {
            const { id, name, email } = context
            return (
                <Grid
                    container
                    direction="row"
                    justify="space-around"
                    alignItems="flex-start"
                >
                    <Grid item>
                        <User 
                            id={id}
                            email={email}
                            name={name} />
                            
                    </Grid>
                    <Grid item>
                        <TicketsList />
                    </Grid>
                    <Grid item>
                        <h1>View Area: {email}</h1>
                    </Grid>
                </Grid>
            );
        })}
        </UserContext.Consumer>
    )
};

export default ToDo;