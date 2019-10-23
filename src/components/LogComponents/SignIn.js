import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Button, TextField } from '@material-ui/core';
import { useLazyQuery } from '@apollo/react-hooks';
import { SIGNIN } from '../Resolvers/Query';

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

const SignIn = () => {
    const classes = styles();
    const [form, setForm] = useState({
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
    const [user, setUser] = useState(null);

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

    const [signIn, { data, error }] =  useLazyQuery(SIGNIN);

    if (data) {
        setTimeout(() => {
            setUser(data);
        }, 100)
    };
    console.log('user: ', user);
    if (error){
        console.log('errro: ', error.message);
    }

    const signInHandler = () => {
        const signinVariables = {
            email: form.email.value,
            password: form.password.value
        };
        signIn({ variables: signinVariables });
    };

    return(
        <div className={classes.container}>
            <form className={classes.form} onSubmit={(e) => {
                e.preventDefault();
                signInHandler();
            }}>
                <h1>SIGN IN</h1>
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
                <Button className={classes.button} type="submit">Sign In</Button>
            </form>
        </div>
    );
}

export default SignIn;