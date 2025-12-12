import GameCard from "../components/GameCard";

export default function GameChooser({ games, index, chooseGame, selectedGame }) {
  if (!games?.length) return <h2>Cargando juegos...</h2>;

  const game1 = games[index];
  const game2 = games[index + 1];

  if (!game1 || !game2) return null;

  return (
    <div className="chooser scanlines">
      {selectedGame && (
        <div className="selected-game">
          <img src={selectedGame.image ?? selectedGame.coverUrl ?? selectedGame.thumbnail} alt={selectedGame.title ?? selectedGame.name} />
          <h3>{selectedGame.title ?? selectedGame.name}</h3>
        </div>
      )}

      <h2>¿Cuál prefieres?</h2>

      <div className="cards">
        <GameCard game={game1} onSelect={() => chooseGame(game1)} />
        <GameCard game={game2} onSelect={() => chooseGame(game2)} />
      </div>
    </div>
  );
}
