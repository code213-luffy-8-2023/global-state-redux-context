import "./App.css";
import { Form } from "./components/Form";
import { List } from "./components/List";
import { useEffect, useState } from "react";

function App() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const html = document.querySelector("html");
    html.dataset.theme = theme;
  }, [theme]);

  /**
   * @type {[{robotName: string, robotImage: string}[], (friends: {robotName: string, robotImage: string}[]) => void]}
   */
  const [friends, setFriends] = useState([]);

  function addFriend(friend) {
    setFriends([friend, ...friends]);
  }
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
      <Form addFriend={addFriend} />
      <List friends={friends} />
    </>
  );
}

export default App;
