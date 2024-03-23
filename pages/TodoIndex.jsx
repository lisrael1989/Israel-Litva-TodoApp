const { useState, useEffect } = React;
const { useSelector } = ReactRedux;

import { todoService } from "../services/todo.service.js";
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js";

import { TodoList } from "../cmps/TodoList.jsx";
import { TodoFilter } from "../cmps/TodoFilter.jsx";

import { actions } from "../store/actions/todo.actions.js";
import { UserMsg } from "../cmps/UserMsg.jsx";

export function TodoIndex() {
  const todos = useSelector((storeState) => storeState.todos);
  const [filterBy, setFilterBy] = useState(todoService.getDefaultFilter());

  // console.log(filterBy);
  // console.log(todos);
  useEffect(() => {
    // console.log("test");
    actions.loadTodos(filterBy);
  }, [filterBy]);

  function onSetFilter(filterBy) {
    setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...filterBy }));
  }

  function onRemoveTodo(todoId) {
    actions
      .removeTodo(todoId)
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

    actions
      .saveTodo(todoToSave)
      .then(() => {
        showSuccessMsg("Todo added");
      })
      .catch((err) => {
        showErrorMsg("Cannot add todo");
      });
  }

  function onEditTodo(todo) {
    const txt = prompt("new todo? ", todo.txt);
    const todoToSave = { ...todo, txt };

    actions
      .saveTodo(todoToSave)
      .then(() => {
        showSuccessMsg(`todo updated `);
      })
      .catch((err) => {
        showErrorMsg("Cannot update todo");
      });
  }

  function onUpdateTodo(todo) {
    const todoToSave = { ...todo, isDone: !todo.isDone };
    actions
      .saveTodo(todoToSave)
      .catch((err) => console.error("Cannot update todo", err));
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
