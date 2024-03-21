const { Link, NavLink } = ReactRouterDOM;

export function AppHeader() {
  return (
    <header className="app-header full main-layout">
      <section className="header-container">
        <h1>Todo App</h1>
        <nav className="app-nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/todo">todo</NavLink>
          {/* <a onClick={onToggleCart} href="#">
            🛒 Cart
          </a> */}
        </nav>
      </section>
      {/* {user ? (
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
      <UserMsg /> */}
    </header>
  );
}
