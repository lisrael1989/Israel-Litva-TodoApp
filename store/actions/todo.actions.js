import { todoService } from "../../services/todo.service.js";
import { ADD_TODO, REMOVE_TODO, SET_TODOS, store } from "../store.js";

export function loadTodos(filterBy) {
  return todoService
    .query(filterBy)
    .then((todos) => {
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
  const type = ADD_TODO;
  return todoService
    .save(todo)
    .then((savedtodo) => {
      store.dispatch({ type, todo: savedtodo });
      return savedtodo;
    })
    .catch((err) => {
      console.log("todo action -> Cannot save todo", err);
      throw err;
    });
}
