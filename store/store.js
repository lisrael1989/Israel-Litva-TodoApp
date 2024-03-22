import { userService } from "../services/user.service.js";

const { createStore, compose } = Redux;

//* todos
export const SET_TODOS = "SET_TODOS";
export const REMOVE_TODO = "REMOVE_TODOS";
export const ADD_TODO = "ADD_TODOS";
// export const UPDATE_CAR = "UPDATE_CAR";

//* User
export const SET_USER = "SET_USER";
export const SET_USER_SCORE = "SET_USER_SCORE";

const initialState = {
  todos: [],
  loggedInUser: userService.getLoggedinUser(),
};

export function appReducer(state = initialState, action = {}) {
  switch (action.type) {
    //* TODOS
    case SET_TODOS:
      return { ...state, todos: action.todos };
    case REMOVE_TODO:
      return {
        ...state,
        cars: state.todos.filter((todo) => todo._id !== action.todoId),
      };
    case ADD_TODO:
      return {
        ...state,
        cars: [...state.todos, action.todo],
      };
    // case UPDATE_CAR:
    //   return {
    //     ...state,
    //     cars: state.cars.map((car) =>
    //       car._id === action.car._id ? action.car : car
    //     ),
    //   };

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

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(appReducer, composeEnhancers());

window.gStore = store;
