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
  console.log("inside query");
  return storageService.query(STORAGE_KEY).then((todos) => {
    if (filterBy.txt) {
      const regExp = new RegExp(filterBy.txt, "i");
      todos = todos.filter((todo) => regExp.test(todo.txt));
    }

    if (filterBy.isDone !== null) {
      switch (filterBy.isDone) {
        case true:
          todos = todos.filter((todo) => todo.isDone);
          break;

        case false:
          todos = todos.filter((todo) => !todo.isDone);
          break;
      }
    }

    return todos;
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
    return storageService.post(STORAGE_KEY, todo);
  }
}

function getEmptyTodo() {
  return {
    txt: "",
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
