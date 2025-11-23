export default function GameCard({ game, onSelect }) {
  return (
    <div className="game-card" onClick={onSelect}>
      <img
        src={game.image}
        alt={game.name}
        style={{ width: "200px", borderRadius: "10px" }}
      />
      <h3>{game.name}</h3>
      <p>{game.genres?.join(", ")}</p>
    </div>
  );
}
