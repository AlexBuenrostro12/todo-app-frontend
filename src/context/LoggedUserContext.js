import React, { createContext, useReducer } from 'react';
import { LoggedUserReducer } from '../reducers/LoggedUserReducer';

export const UserContext = createContext();

const LoggedUserProvider = (props) => {
    const [user, dispatchUser] = useReducer(LoggedUserReducer, {
        id: 'dasfas',
        name: 'Pepon',
        email: 'pep@gmail.com',
    });

    return (
        <UserContext.Provider value={{ 
            user, 
            dispatchUser, 
        }}>
            {props.children}
        </UserContext.Provider>
    );
};

export default LoggedUserProvider;