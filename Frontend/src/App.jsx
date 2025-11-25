<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from "react-router-dom";
=======
<<<<<<< Updated upstream
=======
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
>>>>>>> Stashed changes
>>>>>>> parent of 2ec6876 (Revert "Refactor routing and navigation in App.jsx")
import { useEffect, useState } from "react";

import Home from "./pages/Home";
import GameChooser from "./pages/GameChooser";
import Ranking from "./pages/Ranking";
<<<<<<< HEAD
import GameDetail from "./pages/GameDetail";

import Navbar from "./components/Navbar";
import "./styles/gameDetail.css";

=======
<<<<<<< Updated upstream
import "./App.css";
=======
import GameDetail from "./pages/GameDetail";

import Navbar from "./components/Navbar";
>>>>>>> Stashed changes
>>>>>>> parent of 2ec6876 (Revert "Refactor routing and navigation in App.jsx")
import { mockGames } from "./mock/games";

export default function App() {
  const [games, setGames] = useState([]);
  const [index, setIndex] = useState(0);
  const [votes, setVotes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/games")
      .then((res) => res.json())
      .then((data) => setGames(data.length ? data : mockGames))
      .catch(() => setGames(mockGames));
  }, []);

  function chooseGame(game) {
<<<<<<< HEAD
    setVotes([...votes, game]);
    if (index < games.length - 2) setIndex(index + 2);
=======
<<<<<<< Updated upstream
    setSelectedGame(game);
    setVotes([...votes, game]);
=======
    setVotes((prev) => [...prev, game]);
>>>>>>> Stashed changes

    if (index < games.length - 2) {
      setIndex(index + 2);
    } else {
<<<<<<< Updated upstream
      setScreen("ranking");
=======
      navigate("/ranking");
>>>>>>> Stashed changes
    }
>>>>>>> parent of 2ec6876 (Revert "Refactor routing and navigation in App.jsx")
  }

  function restart() {
    setIndex(0);
    setVotes([]);
  }

<<<<<<< HEAD
=======
<<<<<<< Updated upstream
  const ranking = [...votes];

>>>>>>> parent of 2ec6876 (Revert "Refactor routing and navigation in App.jsx")
  return (
    <BrowserRouter>
      <Navbar />

<<<<<<< HEAD
      <div style={{ paddingTop: "80px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/choose" element={<GameChooser games={games} index={index} chooseGame={chooseGame} />} />
          <Route path="/game/:id" element={<GameDetail games={games} chooseGame={chooseGame} />} />
          <Route path="/ranking" element={<Ranking ranking={votes} onRestart={restart} />} />
        </Routes>
      </div>
    </BrowserRouter>
=======
      )}
      {screen === "ranking" && (
        <Ranking ranking={ranking} onRestart={restart} />
      )}
=======
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div style={{ paddingTop: "80px" }}>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/choose"
            element={
              <GameChooser games={games} index={index} chooseGame={chooseGame} />
            }
          />

          <Route
            path="/game/:id"
            element={<GameDetail games={games} />}
          />

          <Route
            path="/ranking"
            element={<Ranking ranking={votes} onRestart={restart} />}
          />
        </Routes>
      </div>
>>>>>>> Stashed changes
    </>
>>>>>>> parent of 2ec6876 (Revert "Refactor routing and navigation in App.jsx")
  );
}
