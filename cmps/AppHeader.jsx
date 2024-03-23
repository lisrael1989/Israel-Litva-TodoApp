const { NavLink } = ReactRouterDOM;
const { useSelector } = ReactRedux;

import { UserMsg } from "./UserMsg.jsx";
import { LoginSignup } from "./LoginSignup.jsx";
import { userService } from "../services/user.service.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { logout } from "../store/actions/user.actions.js";

export function AppHeader() {
  const user = useSelector((storeState) => storeState.loggedInUser);
  const todos = useSelector((storeState) => storeState.todos);

  const doneCount = todos.filter((todo) => todo.isDone).length;
  const totalCount = todos.length;
  const donePercentage = totalCount > 0 ? (doneCount / totalCount) * 100 : 0;

  function onLogout() {
    logout()
      .then(() => {
        showSuccessMsg("logout successfully");
      })
      .catch((err) => {
        showErrorMsg("OOPs try again");
      });
  }

  function onSetUser(user) {
    setUser(user);
    navigate("/");
  }

  return (
    <header className="app-header full main-layout">
      {/* <progress value={todos.isDone} max={todos.leanth} /> */}

      <section className="header-container">
        <h1>Todo App</h1>
        <nav className="app-nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/todo">Todo</NavLink>
        </nav>
      </section>
      {user ? (
        <section>
          <span to={`/user/${user._id}`}>
            Hello {user.fullname} <span>${user.score.toLocaleString()}</span>
          </span>
          <button onClick={onLogout}>Logout</button>
        </section>
      ) : (
        <section>
          <LoginSignup />
        </section>
      )}
      <div className="progress-container">
        <span>Completion bar: </span>
        <progress
          className="progress-bar"
          value={donePercentage}
          max="100"
        ></progress>
        <span>{donePercentage.toFixed(0)}%</span>
      </div>
      <UserMsg />
    </header>
  );
}
