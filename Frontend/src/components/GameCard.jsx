// src/components/GameCard.jsx
import React from "react";

export default function GameCard({ game, onSelect }) {
  if (!game) return null;

  // Normaliza posibles campos que vengan desde backend
  const name = game.name ?? game.title;
  const genres = game.genres ?? game.genre ?? game.genres_names ?? [];
  const rawImg = game.image ?? game.coverUrl ?? game.thumbnail ?? game.cover;
  const img = rawImg ? (rawImg.startsWith("//") ? `https:${rawImg}` : rawImg) : null;

  // Preload (no bloqueante)
  if (img) {
    const i = new Image();
    i.src = img;
  }

  return (
    <div className="game-card">
      <h4>{name}</h4>
      {img ? (
        <img src={img} alt={name} style={{ width: 220, height: "auto" }} />
      ) : (
        <div style={{ width: 220, height: 300, background: "#ddd", display: "flex", alignItems: "center", justifyContent: "center" }}>
          Sin imagen
        </div>
      )}
      <p className="genres">{(Array.isArray(genres) ? genres.join(" • ") : genres) || "Género desconocido"}</p>
      <button onClick={onSelect}>Elegir</button>
    </div>
  );
}
