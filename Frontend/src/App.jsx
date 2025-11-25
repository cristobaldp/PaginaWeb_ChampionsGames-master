<<<<<<< Updated upstream
=======
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
>>>>>>> Stashed changes
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import GameChooser from "./pages/GameChooser";
import Ranking from "./pages/Ranking";
<<<<<<< Updated upstream
import "./App.css";
=======
import GameDetail from "./pages/GameDetail";

import Navbar from "./components/Navbar";
>>>>>>> Stashed changes
import { mockGames } from "./mock/games";


export default function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [games, setGames] = useState([]);
  const [index, setIndex] = useState(0);
  const [votes, setVotes] = useState([]);
  const [screen, setScreen] = useState("home");

  // Cargar juegos desde el backend


  useEffect(() => {
    fetch("http://localhost:3000/api/games")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setGames(data);
        } else {
          setGames(mockGames);
        }
      })
      .catch(() => {
        // Si el backend no responde → usa mock data
        setGames(mockGames);
      });
  }, []);


  function start() {
    setScreen("game");
  }

  function chooseGame(game) {
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
  }

  function restart() {
    setIndex(0);
    setVotes([]);
    setScreen("home");
  }

<<<<<<< Updated upstream
  const ranking = [...votes];

  return (
    <>
      {screen === "home" && <Home onStart={start} />}
      {screen === "game" && (
        <GameChooser
          games={games}
          index={index}
          chooseGame={chooseGame}
          selectedGame={selectedGame}
        />

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
  );
}
