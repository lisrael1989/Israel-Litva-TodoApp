import { todoService } from "../../services/todo.service.js";
import { userService } from "../../services/user.service.js";
import { ADD_TODO, REMOVE_TODO, SET_TODOS, store } from "../store.js";

export const actions = {
  saveTodo,
  removeTodo,
  loadTodos,
};

function loadTodos(filterBy) {
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

function removeTodo(todoId) {
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

function saveTodo(todo) {
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
