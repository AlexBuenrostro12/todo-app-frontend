import React, { useState, createContext } from 'react';

export const UserContext = createContext();

const LoggedUserProvider = (props) => {
    const [user, setUser] = useState({
        id: 'dasfas',
        name: 'Pepon',
        email: 'pep@gmail.com',
    });

    const setUserData = (loggedUser) => {
        const updatedUser = { ...user }
        for (let key in updatedUser) {
            updatedUser[key] = loggedUser[key];
        }
        setUser(updatedUser);
    };

    return (
        <UserContext.Provider value={{ ...user, setUserData: setUserData }}>
            {props.children}
        </UserContext.Provider>
    );
};

export default LoggedUserProvider;