import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store";
import { MoviesList } from "./pages/MoviesList";
import { Routes, Route } from "react-router-dom";
import { SingleMovie } from "./pages/SingleMovie";

function App() {
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<MoviesList />} />
          <Route path="/:id" element={<SingleMovie />} />
        </Routes>
      </Provider>
    </>
  );
}

export default App;
