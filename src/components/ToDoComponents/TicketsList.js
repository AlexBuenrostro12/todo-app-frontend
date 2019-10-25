import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Paper, Typography } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
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
        overflow: 'scroll',
        width: '100%',
        height: '20rem',
    },
    paper: {
        padding: '1rem',
        margin: '1rem',
        cursor: 'pointer',
    },
});

const TicketsList = (props) => {
    const classes = styles();
    const { data } = useQuery(TICKETS, { pollInterval: 200 });
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
                        onClick={() => props.dispatchTicket({ type: 'SHOW_TICKET', id: t.id })}
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
    );
}

export default TicketsList;