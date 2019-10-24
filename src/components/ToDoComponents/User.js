import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Button, TextField, Grid } from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_TICKET } from '../../Resolvers/Mutation';

const styles = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexDirection: 'column',
        padding: '2rem',
    },
    userData: {
        justifyContent: 'space-around',
        marginBottom: '5rem',
    },
    createTicket: {
        justifyContent: 'space-around',
    },
    textField: {
        marginTop: '.5rem',
        marginBottom: '.5rem',
    },
    button: {
        background: 'linear-gradient(45deg, #d2ff52 30%, #91e842 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
    },
});

const User = (props) => {
    const classes = styles();
    const [todo, setTodo] = useState('');

    const [createTicket] = useMutation(CREATE_TICKET);

    const createTicketHandler = async () => {
        const ticketVariables = {
            title: todo,
            email: props.email
        }
        try {
            const response = await createTicket({ variables: ticketVariables });
            console.log('response: ', response);
            
        } catch (error) {
            console.log('error: ', error);
            
        }
    };

    return (
        <div className={classes.container}>
            <div className={classes.userData}>
                <h3>USER DATA</h3>
                <h4>{props.email}</h4>
                <h4>{props.name}</h4>
            </div>
            <form className={classes.createTicket} onSubmit={(e) => {
                e.preventDefault();
                createTicketHandler();
            }}>
                <h3>CREATE TICKET</h3>
                <TextField
                    id= "Ticket"
                    label="New To Do Ticket"
                    className={classes.textField}
                    type="normal"
                    name="normal"
                    margin="normal"
                    variant="outlined"
                    onChange={(e) => setTodo(e.target.value)}
                />
                <div>
                    <Button className={classes.button} type="submit">Sign In</Button>
                </div>
            </form>
        </div>
    )
}

export default User;