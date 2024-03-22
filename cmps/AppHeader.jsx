const { Link, NavLink } = ReactRouterDOM;
const { useState } = React;
const { useSelector, useDispatch } = ReactRedux;
const { useNavigate } = ReactRouter;

import { UserMsg } from "./UserMsg.jsx";
import { LoginSignup } from "./LoginSignup.jsx";
import { userService } from "../services/user.service.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { logout } from "../store/actions/user.actions.js";

export function AppHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((storeState) => storeState.loggedInUser);
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
      <UserMsg />
    </header>
  );
}
