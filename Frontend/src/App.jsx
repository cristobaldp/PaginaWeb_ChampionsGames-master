import { useEffect, useState } from "react";
import Home from "./pages/Home";
import GameChooser from "./pages/GameChooser";
import Ranking from "./pages/Ranking";
import FloatingBackground from "./components/FloatingBackground";
import StarsParallax from "./components/StarsParallax";
import "./App.css";
import "./components/FloatingBackground.css";
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
    setSelectedGame(game);
    setVotes([...votes, game]);

    if (index < games.length - 2) {
      setIndex(index + 2);
    } else {
      setScreen("ranking");
    }
  }

  function restart() {
    setIndex(0);
    setVotes([]);
    setScreen("home");
  }

  const ranking = [...votes];

  return (
    <>
      <StarsParallax />
      <FloatingBackground />
      
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
    </>
  );
}