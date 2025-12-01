export default function Ranking({ ranking, onRestart }) {
  return (
    <div className="ranking scanlines">

      <h2>🎮 Tu Ranking Final</h2>

      <div className="ranking-list">
        {ranking.map((g, i) => (
          <div className="ranking-item" key={i}>
            <img src={g.image} />
            <div>
              <h3>{i + 1}. {g.name}</h3>
              <p>{g.genres?.join(", ")}</p>
            </div>
          </div>
        ))}
      </div>

      <button onClick={onRestart}>Volver a empezar</button>
    </div>
  );
}
