const AppReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        userInfo: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        userInfo: null,
        queue: [],
        watched: [],
      };
    case 'SET_WATCHLIST':
      return {
        ...state,
        queue: action.payload.queue,
        watched: action.payload.watched,
      };
    case 'UPDATE_QUEUE':
      return {
        ...state,
        queue: action.payload,
      };
    case 'UPDATE_WATCHED':
        return {
            ...state,
            queue: action.payload.queue,
            watched: action.payload.watched,
        }
    case 'UPDATE_WATCHED_LIST':
        return {
            ...state,
            watched: action.payload,
        }
    default:
      return state;
  }
};

export default AppReducer;