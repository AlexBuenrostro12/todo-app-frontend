import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Button, TextField } from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_USER_MUTATION } from '../Resolvers/Mutation';

const styles = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        flexDirection: 'column',
    },
    button: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
    },
    form: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
        alignSelf: 'center'
    },
    textField: {
        marginTop: '.5rem',
        marginBottom: '.5rem',
    }
});

const SignUp = () => {
    const classes = styles();
    const [form, setForm] = useState({
        name: {
            label: 'Name',
            value: '',
            type: '',
        },
        email:{
            label: 'Email',
            value: '',
            type: 'email',
        },
        password: {
            label: 'Password',
            value: '',
            type: 'password'
        }
    });

    const formMap = [];
    for(let key in form) {
        formMap.push({
            id: key,
            config: form[key]
        })
    }

    const inputChangeHandler = (e, inputIdentifier) => {
		const updatedForm = {
			...form
		};
		const updatedFormElement = {
			...updatedForm[inputIdentifier]
		};

		updatedFormElement.value = e.target.value;

		updatedForm[inputIdentifier] = updatedFormElement;

		setForm(updatedForm);
	};
    console.log('form: ', form);

    const [signUp] = useMutation(CREATE_USER_MUTATION);

    const userVariebles = {};
    for (let key in form) {
        userVariebles[key] =  form[key].value;
    };
    
    
    const createUserHandler = async () => {
        //setLoading(true);
        try {
            const response = await signUp({ variables: userVariebles });
            console.log('response: ', response);
            
        } catch (error) {
            console.log('error: ', error);
            
        }
    };
    return(
        <div className={classes.container}>
            <form className={classes.form} onSubmit={(e) => {
                e.preventDefault();
                createUserHandler();
            }}>
                <h1>SIGN UP</h1>
                {formMap.map(el => (
                    <TextField
                        key={el.id}
                        id= {el.id}
                        label={el.config.label}
                        className={classes.textField}
                        type={el.config.type}
                        name={el.config.type}
                        autoComplete={el.config.type}
                        margin="normal"
                        variant="outlined"
                        onChange={(e) => inputChangeHandler(e, el.id)}
                    />
                ))}
                <Button className={classes.button} type="submit">Sign Up</Button>
            </form>
        </div>
    );
}

export default SignUp;