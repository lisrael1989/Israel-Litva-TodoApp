const { useState, useEffect, useRef } = React;

import { utilService } from "../services/util.service.js";

export function TodoFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ filterBy });
  // onSetFilter = useRef(utilService.debounce(onSetFilter));

  useEffect(() => {
    onSetFilter(filterByToEdit);
  }, [filterByToEdit]);

  function handleChange({ target }) {
    let { value, name } = target;

    if (name === "isDone") {
      if (value === "active") value = false;
      else if (value === "done") value = true;
      else value = null;
    }

    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [name]: value }));
  }

  return (
    <section className="todo-filter ">
      <h3 className="todo-filter-title">Todos Filter</h3>
      <form>
        <label htmlFor="txt"></label>
        <input
          type="search"
          id="txt"
          name="txt"
          placeholder="By Todo text"
          value={filterBy.txt}
          onChange={handleChange}
        />

        <select name="isDone" id="isDone" onChange={handleChange}>
          <option value="All ">All Todos</option>
          <option value="active">Need to finish</option>
          <option value="done">Done todos</option>
        </select>
      </form>
    </section>
  );
}
