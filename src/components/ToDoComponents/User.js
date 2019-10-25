import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Button, TextField } from '@material-ui/core';
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
    inputsContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'column',
    }
});

const User = (props) => {
    const classes = styles();
    const [todo, setTodo] = useState('');
    const [reviewDate, setReviewDate] = useState('');

    
    const [createTicket] = useMutation(CREATE_TICKET);
    
    const createTicketHandler = async () => {
        const ticketVariables = {
            title: todo,
            email: props.email,
            review: reviewDate,
        }
        try {
            const response = await createTicket({ variables: ticketVariables });
            console.log('response: ', response);
            setTodo('');
        } catch (error) {
            console.log('error: ', error);
            
        }
    };

    const logOut = (e) => {
        e.preventDefault();
        props.history.replace('/');
    };

    return (
        <div className={classes.container}>
            <div className={classes.userData}>
                <h3>USER DATA</h3>
                <h4>{props.email}</h4>
                <h4>{props.name}</h4>
                <a href="/" onClick={(e) => logOut(e)}>
                    <h5>Log out!</h5>
                </a>
            </div>
            <form className={classes.createTicket} onSubmit={(e) => {
                e.preventDefault();
                createTicketHandler();
            }}>
                <h3>CREATE TICKET</h3>
                <div className={classes.inputsContainer}>
                    <TextField
                        id= "Ticket"
                        label="New To Do Ticket"
                        className={classes.textField}
                        type="normal"
                        name="normal"
                        margin="normal"
                        variant="outlined"
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}
                    />
                    <TextField
                        id= "Review"
                        label="Review date"
                        type="datetime-local"
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        onChange={(e) => setReviewDate(e.target.value)}

                    />
                </div>
                <div>
                    <Button className={classes.button} type="submit">Create</Button>
                </div>
            </form>
        </div>
    )
}

export default User;