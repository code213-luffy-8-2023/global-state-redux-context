import "./App.css";
import { Form } from "./components/Form";
import { List } from "./components/List";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const html = document.querySelector("html");
    html.dataset.theme = theme;
  }, [theme]);

  return (
    <>
      <header>
        <h1>My Robots friends</h1>
        <button
          className="theme-switcher"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? "Dark" : "Light"}
        </button>
      </header>
      <Provider store={store}>
        <Form />
        <List />
      </Provider>
    </>
  );
}

export default App;
