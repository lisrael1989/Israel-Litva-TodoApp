const Router = ReactRouterDOM.HashRouter;
const { Route, Routes } = ReactRouterDOM;
// const { Provider } = ReactRedux;

import { AppHeader } from "./cmps/AppHeader.jsx";

import { HomePage } from "./pages/HomePage.jsx";
import { AboutUs } from "./pages/AboutUs.jsx";
import { TodoIndex } from "./pages/TodoIndex.jsx";
// import { store } from "./store/store.js";

export function App() {
  return (
    <Router>
      <section className="app">
        <AppHeader />
        <main className="main-layout">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/todo" element={<TodoIndex />} />
          </Routes>
        </main>
      </section>
    </Router>
  );
}
