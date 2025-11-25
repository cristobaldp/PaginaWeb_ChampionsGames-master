

import Home from "./pages/Home";
import GameChooser from "./pages/GameChooser";
import Ranking from "./pages/Ranking";
import GameDetail from "./pages/GameDetail";

import "./styles/gameDetail.css";

import { mockGames } from "./mock/games";

export default function App() {
  const [games, setGames] = useState([]);
  const [index, setIndex] = useState(0);
  const [votes, setVotes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/games")
      .then((res) => res.json())
      .then((data) => setGames(data.length ? data : mockGames))
      .catch(() => setGames(mockGames));
  }, []);

  function chooseGame(game) {
    setVotes([...votes, game]);
    if (index < games.length - 2) setIndex(index + 2);
  }

  function restart() {
    setIndex(0);
    setVotes([]);
  }

  return (
    <BrowserRouter>
      <Navbar />

      <div style={{ paddingTop: "80px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/choose" element={<GameChooser games={games} index={index} chooseGame={chooseGame} />} />
          <Route path="/game/:id" element={<GameDetail games={games} chooseGame={chooseGame} />} />
          <Route path="/ranking" element={<Ranking ranking={votes} onRestart={restart} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
