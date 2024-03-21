import { TodoPreview } from "./TodoPreview.jsx";

export function TodoList({ todos, onRemoveTodo, onEditTodo }) {
  return (
    <ul className="todo-list" style={{ listStyleType: "none", padding: 0 }}>
      {todos.map((todo) => (
        <li key={todo._id}>
          <TodoPreview
            todo={todo}
            onRemoveTodo={onRemoveTodo}
            onEditTodo={onEditTodo}
          />
        </li>
      ))}
    </ul>
  );
}
