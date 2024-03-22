const { useState, useEffect, useRef } = React;

import { utilService } from "../services/util.service.js";

export function TodoFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy });
  onSetFilter = useRef(utilService.debounce(onSetFilter));

  useEffect(() => {
    onSetFilter.current(filterByToEdit);
  }, [filterByToEdit]);

  function handleChange({ target }) {
    let { value, name: field, type } = target;
    value = type === "number" ? +value : value;
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }));
  }

  return (
    <section className="todo-filter full main-layout">
      <h2>Todos Filter</h2>
      <form>
        <label htmlFor="txt"></label>
        <input
          type="text"
          id="txt"
          name="txt"
          placeholder="By txt"
          value={filterByToEdit.txt}
          onChange={handleChange}
        />

        <label htmlFor="maxPrice">Max price:</label>
        <input
          type="number"
          id="maxPrice"
          name="maxPrice"
          placeholder="By max price"
          value={filterByToEdit.maxPrice || ""}
          onChange={handleChange}
        />
      </form>
    </section>
  );
}
