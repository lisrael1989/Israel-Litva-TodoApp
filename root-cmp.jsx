const Router = ReactRouterDOM.HashRouter;
const { Route, Routes } = ReactRouterDOM;
const { Provider } = ReactRedux;

import { store } from "./store/store.js";

import { HomePage } from "./pages/HomePage.jsx";
import { AboutUs } from "./pages/AboutUs.jsx";
import { TodoIndex } from "./pages/TodoIndex.jsx";

import { AppHeader } from "./cmps/AppHeader.jsx";
import { AppFooter } from "./cmps/AppFooter.jsx";

export function App() {
  return (
    <Provider store={store}>
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
          <AppFooter />
        </section>
      </Router>
    </Provider>
  );
}
