export default function GameCard({ game, onSelect }) {
  return (
    <div className="game-card" onClick={onSelect}>
      <div className="game-image">
        <img src={game.image} alt={game.name} />
      </div>

      <div className="game-info">
        <h3>{game.name}</h3>
        <p>{game.genres?.join(", ")}</p>
      </div>
    </div>
  );
}
