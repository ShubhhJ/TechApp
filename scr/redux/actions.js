export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const mockUser = { email: 'test@gmail.com', password: 'Test@123' };
      
      if (email === mockUser.email && password === mockUser.password) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { email }, 
        });
      } else {
        dispatch({
          type: LOGIN_FAILURE,
          payload: 'Invalid email or password',
        });
      }
    } catch (error) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: 'Login failed, please try again',
      });
    }
  };
};

export const addToFavorites = (product) => {
  return {
    type: ADD_TO_FAVORITES,
    payload: product,
  };
};
