const initialState = {
    isLoggedin: false,
    userInfo: {
      email: null,
      uid: null,
      name: null,
      usertype:null,
    }
  };
  
  const loadState = () => {
    try {
      const serializedState = sessionStorage.getItem('reduxState');
      if (serializedState === null) {
        return initialState;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return initialState;
    }
  };
  
  const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      sessionStorage.setItem('reduxState', serializedState);
    } catch {
      
    }
  };
  
  const reducer = (state = loadState(), action) => {
    switch (action.type) {
      case 'login':
        const newState = {
          ...state,
          isLoggedin: true,
          userInfo: {
            email: action.payload.email,
            uid: action.payload.uid,
            name: action.payload.name,
            usertype:action.payload.usertype,
          }
        };
        saveState(newState);
        return newState;
      case 'logout':
        const logoutState = {
          ...state,
          isLoggedin: false,
          userInfo: {
            email: null,
            uid: null,
            name: null,
            usertype:null,
          }
        };
        saveState(logoutState);
        return logoutState;
      default:
        
        return state;
    }
  };
  
  export default reducer;
  