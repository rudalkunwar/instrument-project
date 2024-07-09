export const userLogin = (email, uid, name,usertype) => {
    return (dispatch) => {
        dispatch({
            type: 'login',
            payload: { email, uid, name,usertype }
        });
    };
};

export const userLogout = () => {
    return (dispatch) => {
        dispatch({
            type: 'logout'
        });
    };
};
