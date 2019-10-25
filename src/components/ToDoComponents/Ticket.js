import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Card, CardActions, CardContent, Typography, Button, TextField } from '@material-ui/core';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { SINGLE_TICKET } from '../../Resolvers/Query';
import { EDIT_TICKET, ASSIGN_DEVELOPER, DELETE_TICKET } from '../../Resolvers/Mutation';

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
    comments: {
        marginTop: '1rem',
        marginBottom: '1rem',
    },
    save: {
        marginLeft: '.5rem'
    },
    ticketTitleContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});

const Ticket = (props) => {
    const classes = styles();
    const [singleTicket, { data, loading = null, error }] = useLazyQuery(SINGLE_TICKET, { 
        variables: { id: props.ticket ?  props.ticket : '' },
        pollInterval: 500
    });
    useEffect(() => {
        singleTicket();
        setDisabledEdit(true);
        setNewTitle('');
    },[props.ticket]);

    console.log(data);

    const [newTitle, setNewTitle] = useState('');
    const [disabledEdit, setDisabledEdit] = useState(true);
    
    const commentHandler = () => {
        console.log('editHandler')
    };

    const [updateTicket] = useMutation(EDIT_TICKET);
    const editHandler = async (idTicket) => {
        console.log('editHandler');
        const editTicketVariables = {
            id: idTicket,
            title: newTitle
        };        
        const updatedTicket = await updateTicket({ variables: editTicketVariables });
        console.log('updatedTicket: ', updatedTicket);
        if (updateTicket){
            setDisabledEdit(true);
            setNewTitle('');
        }
        
    };    
    const [assignDeveloper] = useMutation(ASSIGN_DEVELOPER);
    const beDeveloperHandler = async (ticketId) => {
        console.log('beDeveloperHandler')
        const assignDeveloperVariables = {
            id: ticketId,
            email: props.userEmail
        }
        const assignedDeveloper =  await assignDeveloper({ variables: assignDeveloperVariables })
        console.log('assignedDeveloper: ', assignedDeveloper);
    };    
    
    const [deleteTicket] = useMutation(DELETE_TICKET);
    const deleteHandler = async (ticketId) => {
        console.log('deleteHandler');
        const deletedTicket = await deleteTicket({ variables: { id: ticketId } });
        console.log('deletedTicket: ', deletedTicket);
    };        
   
    return (
        <div className={classes.ticketContainer}>
            <div className={classes.titleContainer}>
                <h3>SELECTED TICKET</h3>
            </div>
            <div className={classes.ticket}>
                {data && data.ticket && !loading && <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            By: {data.ticket.owner.name}
                        </Typography>

                        <div className={classes.ticketTitleContainer}>
                            <TextField
                                label="Title"
                                value={disabledEdit ? data.ticket.title : newTitle}
                                disabled={disabledEdit}
                                type="normal"
                                name="normal"
                                margin="normal"
                                variant="outlined"
                                onChange={(e) => setNewTitle(e.target.value)}
                            />
                            {!disabledEdit && (
                                <div>
                                    <Button
                                        className={classes.save} 
                                        size="small"
                                        onClick={() => editHandler(data.ticket.id)}
                                    >
                                        Save
                                    </Button>
                                </div>
                            )}
                        </div>

                        <Typography className={classes.pos} color="textSecondary">
                            Commets
                        </Typography>
                        {data.ticket.comments.map(c => (
                            <Typography
                                key={c.id}
                                variant="body2" component="p"
                                className={classes.comments}
                            >
                                Comment by: {c.commentedBy.name}
                                <br/>
                                {c.comment}
                            </Typography>
                        ))}
                        <Typography className={classes.pos} color="textSecondary">
                            Developed by
                        </Typography>
                        <Typography variant="h5" component="h6">
                            {data.ticket.developer ? data.ticket.developer.developedBy.name : 'No one!'}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        {data.ticket.owner.email === props.userEmail && (
                            <Button 
                                size="small"
                                onClick={() => { setDisabledEdit(!disabledEdit); setNewTitle(''); }}
                            >
                                {disabledEdit ? 'Edit' : 'CancelEdit'}
                            </Button>
                        )}
                        {!data.ticket.developer && props.userEmail !== '' && (
                            <Button 
                                size="small"
                                onClick={() => beDeveloperHandler(data.ticket.id)}
                            >
                                Be developer
                            </Button>
                        )}
                        {data.ticket.owner.email === props.userEmail && (
                            <Button 
                                size="small"
                                onClick={() => deleteHandler(data.ticket.id)}
                            >
                                Delete
                            </Button>
                        )}
                    </CardActions>
                </Card>}
            </div>
        </div>
    );
}

export default Ticket;