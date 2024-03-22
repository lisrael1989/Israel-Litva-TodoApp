const { useState, useEffect } = React;

import { todoService } from "../services/todo.service.js";
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js";
import { TodoList } from "../cmps/TodoList.jsx";
import { user } from "../cmps/user.jsx";
import { UserMsg } from "../cmps/UserMsg.jsx";
import { TodoFilter } from "../cmps/TodoFilter.jsx";

export function TodoIndex() {
  const [todos, setTodos] = useState([]);
  const [filterBy, setFilterBy] = useState(todoService.getDefaultFilter());

  useEffect(() => {
    loadTodos();
  }, [filterBy]);

  function loadTodos() {
    return todoService
      .query(filterBy)
      .then(setTodos)
      .catch((err) => {
        console.log(" Cannot load todos", err);
        showErrorMsg(" Cannot load todos");
      });
  }

  const onUpdateTodo = (updatedTodo) => {
    todoService
      .save(updatedTodo)
      .then((savedTodo) => {
        setTodos(
          todos.map((todo) => (todo._id === savedTodo._id ? savedTodo : todo))
        );
      })
      .catch((err) => console.error("Cannot update todo", err));
  };

  function onSetFilter(newFilterBy) {
    // Spread the newFilterBy over the previous state to merge them
    setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...newFilterBy }));
  }

  function onRemoveTodo(todoId) {
    todoService
      .remove(todoId)
      .then(() => {
        setTodos((prevTodos) =>
          prevTodos.filter((todo) => todo._id !== todoId)
        );
        showSuccessMsg("Todo removed");
      })
      .catch((err) => {
        showErrorMsg("Cannot remove todo");
      });
  }

  function onAddTodo() {
    const todoToSave = todoService.getEmptyTodo();
    todoToSave.txt = prompt("ADD todo ");
    todoService
      .save(todoToSave)
      .then((saveTodo) => {
        setTodos((prevTodos) => [saveTodo, ...prevTodos]);
        console.log(saveTodo);
        showSuccessMsg("Todo added");
      })
      .catch((err) => {
        showErrorMsg("Cannot add todo");
      });
  }
  function onEditTodo(todo) {
    const txt = prompt("new todo? ");
    const todoToSave = { ...todo, txt };

    todoService
      .save(todoToSave)
      .then((saveTodo) => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) => (todo._id === saveTodo._id ? saveTodo : todo))
        );
        showSuccessMsg(`todo updated `);
      })
      .catch((err) => {
        showErrorMsg("Cannot update todo");
      });
  }

  return (
    <section className="todo-index">
      {!todos.length && <div>You dont have TODOS...</div>}

      <TodoFilter onSetFilter={onSetFilter} filterBy={filterBy} />
      <button className="add-btn" title="Add todo" onClick={onAddTodo}>
        Add todo ⌨️
      </button>

      {todos && (
        <TodoList
          todos={todos}
          onRemoveTodo={onRemoveTodo}
          onEditTodo={onEditTodo}
          onUpdateTodo={onUpdateTodo}
        />
      )}
      <UserMsg />
    </section>
  );
}
