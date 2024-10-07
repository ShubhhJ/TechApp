import { LOGIN_SUCCESS, LOGIN_FAILURE, ADD_TO_FAVORITES } from './actions';

const initialAuthState = {
  isLoggedIn: false,
  user: null,
  error: null,
};

const initialFavoritesState = {
  favorites: [],
};

export const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const favoriteReducer = (state = initialFavoritesState, action) => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    default:
      return state;
  }
};
