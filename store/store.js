import { userService } from "../services/user.service.js";
import { todoService } from "../services/todo.service.js";

const { createStore, compose } = Redux;

//* todos
export const SET_TODOS = "SET_TODOS";
export const REMOVE_TODO = "REMOVE_TODO";
export const ADD_TODO = "ADD_TODO";
// export const UPDATE_CAR = "UPDATE_CAR";

//* User
export const SET_USER = "SET_USER";
export const SET_USER_SCORE = "SET_USER_SCORE";

const initialState = {
  todos: [],
  filterBy: todoService.getDefaultFilter(),
  loggedInUser: userService.getLoggedinUser(),
};

export function appReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_TODOS:
      return { ...state, todos: action.todos };
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== action.todoId),
      };
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.todo],
      };

    //* User
    case SET_USER:
      return {
        ...state,
        loggedInUser: action.user,
      };
    case SET_USER_SCORE:
      const loggedInUser = { ...state.loggedInUser, score: action.score };
      return { ...state, loggedInUser };

    default:
      return state;
  }
}

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(appReducer);

window.gStore = store;
