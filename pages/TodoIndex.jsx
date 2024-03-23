const { useState, useEffect } = React;
const { useSelector } = ReactRedux;

import { todoService } from "../services/todo.service.js";
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js";

import { TodoList } from "../cmps/TodoList.jsx";
import { TodoFilter } from "../cmps/TodoFilter.jsx";

import {
  loadTodos222,
  loadTodos,
  removeTodo,
  saveTodo,
} from "../store/actions/todo.actions.js";
import { UserMsg } from "../cmps/UserMsg.jsx";

export function TodoIndex() {
  const todos = useSelector((storeState) => storeState.todos);
  const [filterBy, setFilterBy] = useState(todoService.getDefaultFilter());

  console.log(filterBy);
  console.log(todos);
  useEffect(() => {
    console.log("test");
    loadTodos({ txt: "", isDone: null });
  }, []);

  return <div>123</div>;
  function onSetFilter(filterBy) {
    setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...filterBy }));
  }

  // function loadTodos() {
  //   return todoService
  //     .query(filterBy)
  //     .then(setTodos)
  //     .catch((err) => {
  //       console.log(" Cannot load todos", err);
  //       showErrorMsg(" Cannot load todos");
  //     });
  // }

  function onRemoveTodo(todoId) {
    removeTodo(todoId)
      .then(() => {
        showSuccessMsg("Todo removed");
      })
      .catch((err) => {
        showErrorMsg("Cannot remove todo");
      });
  }

  function onAddTodo() {
    const todoToSave = todoService.getEmptyTodo();
    todoToSave.txt = prompt("ADD todo ");

    saveTodo(todoToSave)
      .then(() => {
        showSuccessMsg("Todo added");
      })
      .catch((err) => {
        showErrorMsg("Cannot add todo");
      });
  }

  function onEditTodo(todo) {
    const txt = prompt("new todo? ");
    const todoToSave = { ...todo, txt };

    saveTodo(todoToSave)
      .then(() => {
        showSuccessMsg(`todo updated `);
      })
      .catch((err) => {
        showErrorMsg("Cannot update todo");
      });
  }

  // const onUpdateTodo = (updatedTodo) => {
  //   todoService
  //     .save(updatedTodo)
  //     .then((savedTodo) => {
  //       setTodos(
  //         todos.map((todo) => (todo._id === savedTodo._id ? savedTodo : todo))
  //       );
  //     })
  //     .catch((err) => console.error("Cannot update todo", err));
  // };

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
          // onUpdateTodo={onUpdateTodo}
        />
      )}
      <UserMsg />
    </section>
  );
}
