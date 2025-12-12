import React, { useState } from "react";
import "./login.css";  // IMPORTAR EL CSS DE LOGIN

export default function Login({ onLogin, goRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const users = JSON.parse(localStorage.getItem("users") || "{}");
    const user = users[username];

    if (!user) {
      setError("El usuario no existe.");
      return;
    }

    if (user.password !== password) {
      setError("Contraseña incorrecta.");
      return;
    }

    onLogin({ username, gmail: user.gmail });
  }

  return (
    <div className="auth-card">
      <h2>Bienvenido 👋</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre de usuario</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Tu usuario..."
        />

        <label>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••"
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Iniciar sesión</button>
        <button type="button" onClick={goRegister}>
          Crear nueva cuenta
        </button>
      </form>
    </div>
  );
}
