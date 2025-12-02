export default function Ranking({ ranking, onRestart }) {
  // Obtener top 3 y el resto
  const top3 = ranking.slice(0, 3);
  const rest = ranking.slice(3);

  return (
    <div className="ranking">
      <h2 className="ranking-title">🎮 Tu Ranking Final</h2>

      {/* PODIO 3D */}
      {top3.length > 0 && (
        <div className="podium-container">
          {/* 2do Lugar */}
          {top3[1] && (
            <div className="podium-place second-place">
              <div className="medal silver-medal">🥈</div>
              <div className="game-card-podium">
                <img src={top3[1].image} alt={top3[1].name} />
              </div>
              <div className="podium-info">
                <h3>2º</h3>
                <p>{top3[1].name}</p>
              </div>
              <div className="podium-base second-base">2</div>
            </div>
          )}

          {/* 1er Lugar - Centro y más alto */}
          {top3[0] && (
            <div className="podium-place first-place">
              <div className="medal gold-medal">🥇</div>
              <div className="crown">👑</div>
              <div className="game-card-podium">
                <img src={top3[0].image} alt={top3[0].name} />
              </div>
              <div className="podium-info">
                <h3>1º</h3>
                <p>{top3[0].name}</p>
              </div>
              <div className="podium-base first-base">1</div>
            </div>
          )}

          {/* 3er Lugar */}
          {top3[2] && (
            <div className="podium-place third-place">
              <div className="medal bronze-medal">🥉</div>
              <div className="game-card-podium">
                <img src={top3[2].image} alt={top3[2].name} />
              </div>
              <div className="podium-info">
                <h3>3º</h3>
                <p>{top3[2].name}</p>
              </div>
              <div className="podium-base third-base">3</div>
            </div>
          )}
        </div>
      )}

      {/* RESTO DEL RANKING */}
      {rest.length > 0 && (
        <>
          <h3 className="rest-title">Otros juegos</h3>
          <div className="ranking-list">
            {rest.map((g, i) => (
              <div className="ranking-item" key={i}>
                <img src={g.image} alt={g.name} />
                <div>
                  <h3>
                    {i + 4}. {g.name}
                  </h3>
                  <p>{g.genres?.join(", ")}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <button className="restart-button" onClick={onRestart}>
        🔄 Volver a empezar
      </button>
    </div>
  );
}