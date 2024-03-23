import { todoService } from "../../services/todo.service.js";
import { userService } from "../../services/user.service.js";
import {
  ADD_TODO,
  REMOVE_TODO,
  SET_TODOS,
  UPDATE_TODO,
  store,
} from "../store.js";

export const actions = {
  saveTodo,
  removeTodo,
  loadTodos,
};

export function loadTodos(filterBy) {
  console.log("inside load todos actions");
  return todoService
    .query(filterBy)
    .then((todos) => {
      console.log({ todos });
      store.dispatch({ type: SET_TODOS, todos });
    })
    .catch((err) => {
      console.log("todo action -> Cannot load todos", err);
      throw err;
    });
}

export function removeTodo(todoId) {
  return todoService
    .remove(todoId)
    .then(() => {
      store.dispatch({ type: REMOVE_TODO, todoId });
    })
    .catch((err) => {
      console.log("todo action -> Cannot remove todo", err);
      throw err;
    });
}

export function saveTodo(todo) {
  const actionType = todo._id ? UPDATE_TODO : ADD_TODO;

  return todoService
    .save(todo)
    .then((savedtodo) => {
      store.dispatch({ type: actionType, todo: savedtodo });
      return savedtodo;
    })
    .catch((err) => {
      console.log("todo action -> Cannot save todo", err);
      throw err;
    });
}
