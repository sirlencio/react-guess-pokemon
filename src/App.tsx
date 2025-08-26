import { useWindowSize } from "react-use";
import PokemonDisplay from "./components/pokemon-display";
import PokemonFeedback from "./components/pokemon-feedback";
import PokemonForm from "./components/pokemon-form";
import { GameState, useGameManager } from "./hooks/use-game-manager";
import ReactConfetti from "react-confetti";

const App = () => {
  const {
    loadNewPokemon,
    pokemon,
    error,
    isLoading,
    handlePokemonNameSubmit,
    gameState,
  } = useGameManager();

  const {width, height} = useWindowSize();

  if (error) {
    return <div className="alert alert-danger text-center">{error}</div>;
  }

  return (
    <div className="container mx-auto my-5">
      {
        gameState === GameState.Correct && (
          <ReactConfetti 
            width={width}
            height={height}
            numberOfPieces={300}
            recycle={false}
          />
        )
      }
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <PokemonDisplay pokemon={pokemon} isLoading={isLoading} gameState={gameState}/>
          <PokemonForm handlePokemonNameSubmit={handlePokemonNameSubmit} gameState={gameState} pokemon={pokemon}/>
          <PokemonFeedback loadNewPokemon={loadNewPokemon} gameState={gameState}/>
        </div>
      </div>
    </div>
  );
};

export default App;
