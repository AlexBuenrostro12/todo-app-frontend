import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Card, CardActions, CardContent, Typography, Button } from '@material-ui/core';
import { useLazyQuery } from '@apollo/react-hooks';
import { SINGLE_TICKET } from '../../Resolvers/Query';

const styles = makeStyles({
    ticketContainer: {
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
    card: {
        minWidth: 275,
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
});

const Ticket = (props) => {
    const classes = styles();
    const [singleTicket, { data, loading, error }] = useLazyQuery(SINGLE_TICKET, { variables: { id: props.ticket ?  props.ticket : '' }});
    useEffect(() => {
        singleTicket();
    },[props.ticket])
    console.log(data);
    return (
        <div className={classes.ticketContainer}>
            <div className={classes.titleContainer}>
                <h3>SELECTED TICKET</h3>
            </div>
            <div className={classes.ticket}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Word of the Day
                        </Typography>
                        <Typography variant="h5" component="h2">
                            be nev lent
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                        adjective
                        </Typography>
                        <Typography variant="body2" component="p">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </div>
        </div>
    );
}

export default Ticket;