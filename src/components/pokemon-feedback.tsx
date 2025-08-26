import { GameState } from "../hooks/use-game-manager";

interface Props {
  loadNewPokemon: () => void;
  gameState: GameState
}

const PokemonFeedback = ({ loadNewPokemon, gameState }: Props) => {

  if (gameState === GameState.Playing){
    return null;
  }

  return (
    <div
      className={`alert alert-${
        gameState === GameState.Correct ? "success" : "danger"
      } text-center`}
    >
      {gameState === "correct" ? (
        <h2>
          ¡Correcto! <i className="bi bi-camera-reels"></i>
        </h2>
      ) : (
        <h2>
          ¡Inorrecto! <i className="bi bi-camera-video-off"></i>
        </h2>
      )}
      <button className="btn btn-dark mt-3" onClick={loadNewPokemon}>
        Volver a jugar
      </button>
    </div>
  );
};

export default PokemonFeedback;
