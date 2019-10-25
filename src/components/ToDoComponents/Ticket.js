import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Card, CardActions, CardContent, Typography, Button, TextField } from '@material-ui/core';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { SINGLE_TICKET } from '../../Resolvers/Query';
import { EDIT_TICKET, ASSIGN_DEVELOPER, DELETE_TICKET, COMMENT_TICKET } from '../../Resolvers/Mutation';

const styles = makeStyles({
    ticketContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '2rem',
        alignItems: 'flex-start',
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
        marginLeft: '1rem'
    },
    ticketTitleContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    saveButtonContainer: {
        marginLeft: '5rem'
    },
    listOfComments: {
        width: '100%',
        height: '12rem',
        overflow: 'scroll'
    }
});

const Ticket = (props) => {
    const classes = styles();
    const [singleTicket, { data, loading = null }] = useLazyQuery(SINGLE_TICKET, { 
        variables: { id: props.ticket ?  props.ticket : '' },
        pollInterval: 500
    });

    useEffect(() => {
        if (props.userId === '' && props.userEmail === '') {
            props.history.replace('/');
        } else {
            singleTicket();
            setDisabledEdit(true);
            setNewTitle('');
            setComment('');
        }
    },[props,singleTicket]);

    const [newTitle, setNewTitle] = useState('');
    const [reviewData, setReviewDate] = useState('');
    const [disabledEdit, setDisabledEdit] = useState(true);
    const [comment, setComment] = useState('');

    const [commentTicket] = useMutation(COMMENT_TICKET);
    const commentHandler = async (ticketId) => {
        const commentVariables = {
            id: ticketId,
            comment: comment,
            email: props.userEmail,
        };

        const commentedTicket = await commentTicket({ variables: commentVariables });
        console.log('commentedTicket: ', commentedTicket);
        if (commentTicket)
            setComment('');
    };

    const [updateTicket] = useMutation(EDIT_TICKET);
    const editHandler = async (data) => {
        const editTicketVariables = {
            id: data.ticket.id,
            title: newTitle === '' ? data.ticket.title : newTitle,
            review: reviewData === '' ? data.ticket.review : reviewData,
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
        const assignDeveloperVariables = {
            id: ticketId,
            email: props.userEmail
        }
        const assignedDeveloper =  await assignDeveloper({ variables: assignDeveloperVariables })
        console.log('assignedDeveloper: ', assignedDeveloper);
    };    
    
    const [deleteTicket] = useMutation(DELETE_TICKET);
    const deleteHandler = async (ticketId) => {
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
                            Owner: {data.ticket.owner.name}
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
                            <div className={disabledEdit ? classes.saveButtonContainer :  null}>
                                {!disabledEdit && (
                                    <Button
                                        className={classes.save} 
                                        size="small"
                                        onClick={() => editHandler(data)}
                                    >
                                        Save
                                    </Button>
                                )}
                            </div>
                        </div>
                        {!disabledEdit ? (
                            <TextField
                                id= "Review"
                                label="Review date"
                                type="datetime-local"
                                defaultValue="2019-01-25T10:30"
                                disabled={disabledEdit}
                                InputLabelProps={{
                                shrink: true,
                                }}
                                onChange={(e) => setReviewDate(e.target.value)}
                            />
                        ) :  (
                            <Typography
                                    variant="body2" component="p"
                                    className={classes.comments}
                            >
                                Review: {data.ticket.review}
                            </Typography>
                        )}
                        <Typography className={classes.pos} color="textSecondary">
                            Commets
                        </Typography>
                        {data.ticket.comments.length !== 0 && <div className={classes.listOfComments}>
                            {data.ticket.comments.map(c => (
                                <Typography
                                    key={c.id}
                                    variant="body2" component="p"
                                    className={classes.comments}
                                >
                                    By: {c.commentedBy.name}
                                    <br/>
                                    {c.comment}
                                </Typography>
                            ))}
                        </div>}
                        <div className={classes.ticketTitleContainer}>
                            <TextField
                                label="Comment"
                                value={comment}
                                type="normal"
                                name="normal"
                                margin="normal"
                                variant="outlined"
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <div>
                                <Button
                                    className={classes.save} 
                                    size="small"
                                    onClick={() => commentHandler(data.ticket.id)}
                                >
                                    Comment
                                </Button>
                            </div>
                        </div>

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