import { useParams, useNavigate } from "react-router-dom";

export default function GameDetail({ games, chooseGame }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const game = games.find((g) => g.id === Number(id));

  if (!game) return <h2>Cargando juego...</h2>;

  return (
    <div className="game-detail">
      <div className="detail-card">

        <img className="detail-img" src={game.image} alt={game.name} />

        <div className="detail-info">
          <h1>{game.name}</h1>
          <p className="genres">{game.genres.join(", ")}</p>

          <p className="description">
            Este es un juego increíble del género {game.genres[0]}.
            (Aquí puedes añadir descripción real si quieres).
          </p>

          <div className="detail-buttons">
            <button className="btn-primary" onClick={() => chooseGame(game)}>
              Elegir este juego
            </button>

            <button className="btn-secondary" onClick={() => navigate(-1)}>
              Volver
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
