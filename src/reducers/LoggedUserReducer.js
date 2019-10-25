export const LoggedUserReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
                //console.log('state: ', state, 'action: ', action);
                const updatedUser = { ...state }
                for (let key in updatedUser) {
                    updatedUser[key] = action.user[key];
                }
                //console.log('updatedUser: ', updatedUser);
        return updatedUser;
            
        default:
            return state;

    }
}