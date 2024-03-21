import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";
// import { userService } from "./user.service.js";

const STORAGE_KEY = "todoDB";

_createTodos();

export const todoService = {
  query,
  getById,
  save,
  remove,
  getEmptyTodo,
  getDefaultFilter,
};

function query(filterBy = {}) {
  return storageService.query(STORAGE_KEY).then((todos) => {
    if (!filterBy.txt) filterBy.txt = "";
    const regExp = new RegExp(filterBy.txt, "i");
    return todos.filter((todo) => regExp.test(todo.txt));
  });
}

function getById(todoId) {
  return storageService.get(STORAGE_KEY, todoId);
}

function remove(todoId) {
  return storageService.remove(STORAGE_KEY, todoId);
}

function save(todo) {
  if (todo._id) {
    return storageService.put(STORAGE_KEY, todo);
  } else {
    /* todo.owner = userService.getLoggedinUser();*/
    return storageService.post(STORAGE_KEY, todo);
  }
}

function getEmptyTodo() {
  return {
    // id: "",
    txt: "work hard",
    isDone: false,
  };
}

function getDefaultFilter() {
  return { txt: "", isDone: null };
}

function _createTodos() {
  let todos = utilService.loadFromStorage(STORAGE_KEY);
  if (!todos || !todos.length) {
    todos = [];
    todos.push(_createTodo("Plan a Mini Adventure"));
    todos.push(_createTodo("Write a Letter"));
    todos.push(_createTodo("Sleep"));
    todos.push(_createTodo("Buy gifts to kids"));
    todos.push(_createTodo("Learn new Words"));
    utilService.saveToStorage(STORAGE_KEY, todos);
  }
}

function _createTodo(txt = "") {
  const todo = getEmptyTodo();
  todo.txt = txt;
  todo._id = utilService.makeId();
  return todo;
}
