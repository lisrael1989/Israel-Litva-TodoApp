export function TodoPreview({ todo, onRemoveTodo, onEditTodo }) {
  return (
    <section className="todo-preview">
      <button className="btn " onClick={() => onRemoveTodo(todo._id)}>
        x
      </button>
      <button
        className="btn edit-btn fa-solid fa-pen-to-square"
        onClick={() => onEditTodo(todo)}
      >
        Edit
      </button>
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
