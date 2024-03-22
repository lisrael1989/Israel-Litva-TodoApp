export function TodoPreview({ todo, onRemoveTodo, onEditTodo }) {
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
      <span>{todo.txt}</span>
    </section>
  );
}

{
  /* <label >
<input type="checkbox" checked={todo.checked} onChange={() => handleCheckboxChange(index)}/>
<span className="label">{todo.txt }</span>
</label> */
}
