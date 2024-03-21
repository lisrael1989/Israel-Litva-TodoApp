const { useState, useEffect } = React;
// const { useSelector, useDispatch } = ReactRedux;

import { todoService } from "../services/todo.service.js";
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js";
// import { loadCars, removeCar, saveCar } from "../store/actions/car.actions.js";
// import { ADD_CAR_TO_CART } from "../store/store.js";

export function TodoIndex() {
  const [todos, setTodos] = useState([]);
  const [filterBy, setFilterBy] = useState(todoService.getDefaultFilter());
  // const dispatch = useDispatch();
  // const todos = useSelector((storeState) => storeState.todos);

  useEffect(() => {
    loadTodos(filterBy).catch((err) => {
      showErrorMsg("Cannot load todos!");
    });
  }, [filterBy]);

  function onSetFilter(filterBy) {
    setFilterBy((prevFilter) => ({ ...prevFilter, ...filterBy }));
  }

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

    saveTodo(todoToSave)
      .then((saveTodo) => {
        showSuccessMsg(`Todo added (id: ${saveTodo._id})`);
      })
      .catch((err) => {
        showErrorMsg("Cannot add todo");
      });
  }
  function onEditTodo(todo) {
    const txt = +prompt("new todo? ");
    const todoToSave = { ...todo, txt };

    saveTodo(todoToSave)
      .then((todoToSave) => {
        showSuccessMsg(`Car updated to price: $${todoToSave.txt}`);
      })
      .catch((err) => {
        showErrorMsg("Cannot update car");
      });
  }

  // function addToCart(car) {
  //   console.log(`Adding ${car.vendor} to Cart`);
  //   // TODO: use dispatch
  //   dispatch({ type: ADD_CAR_TO_CART, car });
  //   showSuccessMsg("Added to Cart");
  // }

  return (
    <div>
      <h3>TODO App</h3>
      <main>
        <button className="add-btn" onClick={onAddTodo}>
          Add todo ⌨️
        </button>
        <TodoFilter filterBy={filterBy} onSetFilter={onSetFilter} />
        <ul className="todo-list">
          {todos.map((todo) => (
            <li className="todo-preview" key={todo._id}>
              <div>
                <button
                  onClick={() => {
                    onRemoveTodo(car._id);
                  }}
                >
                  x
                </button>
                <button
                  onClick={() => {
                    onEditTodo(car);
                  }}
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
        <hr />
      </main>
    </div>
  );
}
