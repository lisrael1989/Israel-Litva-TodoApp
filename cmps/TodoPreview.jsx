export function TodoPreview({ todo, onRemoveTodo, onEditTodo, onUpdateTodo }) {
  const handleCheckboxChange = () => {
    const updatedTodo = { ...todo, isDone: !todo.isDone };

    onUpdateTodo(updatedTodo);
  };

  return (
    <section className="todo-preview">
      <button
        className="btn remove-btn fa-solid fa-trash "
        title="Remove"
        onClick={() => onRemoveTodo(todo._id)}
      ></button>
      <button
        className="btn edit-btn fa-solid fa-pen-to-square"
        title="Edit"
        onClick={() => onEditTodo(todo)}
      ></button>
      <label>
        <input
          type="checkbox"
          checked={todo.isDone}
          onChange={handleCheckboxChange}
        />
        <span className={todo.isDone ? "is-done" : ""}>{todo.txt}</span>
      </label>
    </section>
  );
}
