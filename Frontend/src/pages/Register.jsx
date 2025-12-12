import React, { useState } from "react";
import "./register.css";  // IMPORTAR EL CSS DE REGISTER

export default function Register({ onRegister, goLogin }) {
  const [gmail, setGmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!gmail.includes("@")) {
      setError("Introduce un Gmail válido.");
      return;
    }

    if (password.length < 4) {
      setError("La contraseña debe tener al menos 4 caracteres.");
      return;
    }

    if (password !== confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "{}");

    if (users[username]) {
      setError("Ese usuario ya existe.");
      return;
    }

    users[username] = { gmail, password };
    localStorage.setItem("users", JSON.stringify(users));

    onRegister({ username, gmail });
  }

  return (
    <div className="auth-card">
      <h2>Crear cuenta ✨</h2>
      <form onSubmit={handleSubmit}>
        <label>Gmail</label>
        <input
          type="email"
          value={gmail}
          onChange={(e) => setGmail(e.target.value)}
          placeholder="tucorreo@gmail.com"
        />

        <label>Nombre de usuario</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="@usuario"
        />

        <label>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••"
        />

        <label>Confirmar contraseña</label>
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="••••••"
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Registrarme</button>
        <button type="button" onClick={goLogin}>
          Ya tengo cuenta
        </button>
      </form>
    </div>
  );
}
