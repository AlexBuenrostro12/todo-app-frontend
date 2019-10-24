import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Paper, Typography } from '@material-ui/core';
import { useLazyQuery, useQuery } from '@apollo/react-hooks';
import { TICKETS } from '../../Resolvers/Query';

const styles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '2rem',
        alignItems: 'center',
    },
    titleContainer: {
        marginBottom: '5rem',
    },
    ticket: {
        marginBottom: '1rem',
    },
    ticketsList: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '2rem',
        overflow: 'auto'
    },
    paper: {
        padding: '1rem',
        margin: '1rem',
    }
});

const TicketsList = (props) => {
    const classes = styles();

    console.log('refreshList: ', props.refreshList);
    const { loading = null, error, data } = useQuery(TICKETS);
    console.log('data: ', data, loading, error);
  
    return (
        <div className={classes.container}>
            <div className={classes.titleContainer}>
                <h3>TODO TICKETS LIST</h3>
            </div>
            <div className={classes.ticketsList}>
                {data && data.tickets.map(t => (
                    <Paper 
                        key={t.id}
                        className={classes.paper}
                    >
                        <Typography variant="h5" component="h3">
                            {t.title}
                        </Typography>
                        <Typography component="p">
                            By: {t.owner.name}.
                        </Typography>
                    </Paper>
                ))}
            </div>
        </div>
    )
}

export default TicketsList;