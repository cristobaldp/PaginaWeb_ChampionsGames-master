export default function Ranking({ ranking, onRestart }) {
  return (
    <div>
      <h2>Tu Ranking Final</h2>
      <ul>
        {ranking.map((g, i) => (
          <li key={g._id || i}>
            {i + 1}. {g.name}
          </li>
        ))}
      </ul>

      <button onClick={onRestart}>Volver a empezar</button>
    </div>
  );
}
