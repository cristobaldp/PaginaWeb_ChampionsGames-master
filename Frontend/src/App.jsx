import { useEffect, useState } from "react";
import Home from "./pages/Home";
import GameChooser from "./pages/GameChooser";
import Ranking from "./pages/Ranking";

import FloatingBackground from "./components/FloatingBackground";
import StarsParallax from "./components/StarsParallax";

import "./App.css";
import "./components/FloatingBackground.css";
import "./components/Podium3D.css";

import { mockGames } from "./mock/games";

// IMPORTAMOS LOGIN & REGISTER
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {

  // ------------------- AUTENTICACIÓN -------------------

  const [user, setUser] = useState(null);
  const [authScreen, setAuthScreen] = useState("login"); 
  // login | register | app

  function handleLogin(userData) {
    setUser(userData);
    localStorage.setItem("currentUser", JSON.stringify(userData));
    setAuthScreen("app"); // SOLO entra cuando inicia sesión manualmente
  }

  function handleLogout() {
    setUser(null);
    localStorage.removeItem("currentUser");
    setAuthScreen("login");
  }

  // ------------------- TU APP ORIGINAL -------------------

  const [selectedGame, setSelectedGame] = useState(null);
  const [games, setGames] = useState([]);
  const [index, setIndex] = useState(0);
  const [votes, setVotes] = useState([]);
  const [screen, setScreen] = useState("home");

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

  // ------------------- RENDER -------------------

  return (
    <>
      <StarsParallax />
      <FloatingBackground />

      {/* 🔥 SIEMPRE mostrar login o register mientras no esté dentro de la app */}
      {authScreen !== "app" && (
        <div className="auth-root">
          {authScreen === "login" && (
            <Login 
              onLogin={handleLogin}
              goRegister={() => setAuthScreen("register")}
            />
          )}

          {authScreen === "register" && (
            <Register
              onRegister={() => setAuthScreen("login")}
              goLogin={() => setAuthScreen("login")}
            />
          )}
        </div>
      )}

      {/* 🔥 SOLO mostrar la app cuando haya iniciado sesión manualmente */}
      {authScreen === "app" && (
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
        </>
      )}
    </>
  );
}
