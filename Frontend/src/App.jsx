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
  const [authScreen, setAuthScreen] = useState("login"); // login | register | app

  function handleLogin(userData) {
    setUser(userData);
    localStorage.setItem("currentUser", JSON.stringify(userData));
    setAuthScreen("app");
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
  const [loading, setLoading] = useState(false);

  // Ajusta BASE_API si tu backend NO está en localhost:3000
  const BASE_API = "http://localhost:3000/api/games";

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    (async () => {
      try {
        const res = await fetch(BASE_API);
        if (!res.ok) throw new Error("No list endpoint or bad response");
        const data = await res.json();
        // Si tu backend devuelve { games: [...] } lo manejamos
        const list = Array.isArray(data) ? data : data.games ?? [];
        if (mounted) {
          if (list.length > 0) {
            setGames(list);
          } else {
            setGames(mockGames);
          }
        }
      } catch (err) {
        // fallback a mockGames si algo falla
        console.warn("Fetch games failed, using mockGames:", err.message);
        if (mounted) setGames(mockGames);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []); // run once

  function start() {
    // Antes de `start`, asegurarse que hay al menos 2 juegos para GameChooser.
    // Si sólo hay 1, duplicamos uno aleatorio para evitar que GameChooser devuelva null.
    if (games.length === 1) {
      setGames((g) => [...g, g[0]]);
    }
    setScreen("game");
  }

  // función auxiliar para intentar marcar la elección en backend
  async function markPickOnServer(gameId) {
    if (!gameId) return;
    try {
      // endpoint moderno
      const r = await fetch(`${BASE_API}/pick/${gameId}`, { method: "POST" });
      if (r.ok) return true;
      // fallback legacy
      const r2 = await fetch(`${BASE_API}/${gameId}/select`, { method: "POST" });
      return r2.ok;
    } catch (e) {
      // no server or CORS issue -> ignore (frontend seguirá funcionando)
      console.warn("Could not mark pick on server:", e.message);
      return false;
    }
  }

  function chooseGame(game) {
    // Protección: si game es undefined, no hacer nada
    if (!game) return;

    // 1) marcar en backend (no bloqueamos UX si falla)
    markPickOnServer(game._id ?? game.id).catch((e) => console.warn(e));

    // 2) actualizar UI local
    setSelectedGame(game);
    setVotes((prev) => [...prev, game]);

    // 3) avanzar index si hay suficientes juegos
    // Asegurarse de no pasar del array
    const nextIndex = index + 2;
    if (nextIndex <= games.length - 1) {
      setIndex(nextIndex);
      // si al avanzar nos quedamos con menos de 2 elementos restantes y el backend tiene /random,
      // podriamos pedir más y pusharlos; pero para no complicar, por ahora usamos la lista local.
    } else {
      // No hay más pares disponibles -> ir a ranking
      setScreen("ranking");
    }
  }

  function restart() {
    setIndex(0);
    setVotes([]);
    setSelectedGame(null);
    setScreen("home");
    // si quieres resetear picks en backend: POST /api/games/reset-picks
  }

  const ranking = [...votes];

  // ------------------- RENDER -------------------
  // Manejamos loading breve
  if (loading && games.length === 0) return <div>Cargando juegos...</div>;

  return (
    <>
      <StarsParallax />
      <FloatingBackground />

      {/* AUTENTICACIÓN */}
      {authScreen !== "app" && (
        <div className="auth-root">
          {authScreen === "login" && <Login onLogin={handleLogin} goRegister={() => setAuthScreen("register")} />}

          {authScreen === "register" && <Register onRegister={() => setAuthScreen("login")} goLogin={() => setAuthScreen("login")} />}
        </div>
      )}

      {/* APP */}
      {authScreen === "app" && (
        <>
          {screen === "home" && <Home onStart={start} />}

          {screen === "game" && (
            <GameChooser games={games} index={index} chooseGame={chooseGame} selectedGame={selectedGame} />
          )}

          {screen === "ranking" && <Ranking ranking={ranking} onRestart={restart} />}
        </>
      )}
    </>
  );
}
