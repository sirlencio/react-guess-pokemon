import type { Pokemon } from "../interface/pokemon.interface";
import Spiner from "./spiner";
import { GameState } from "../hooks/use-game-manager";

interface Props {
  pokemon: Pokemon | null;
  isLoading: boolean;
  gameState: GameState
}

const PokemonDisplay = ({ pokemon, isLoading, gameState }: Props) => {

  const showAnswer = gameState !== GameState.Playing;
  const image = pokemon?.image;
  const name = pokemon?.name;

  console.log(name);

  return (
    <div className="card">
      <div className="card-header">
        <h1 className="text-center">
          {showAnswer ? name?.toUpperCase() : "¿Quién es ese Pokemón?"}
        </h1>
      </div>
      <div className="card-body">
        {isLoading ? (
          <Spiner />
        ) : (
          <img
            src={image}
            alt={`${name}-image`}
            className="img-fluid mx-auto d-block"
            style={{
              maxHeight: "300px",
              filter: showAnswer ? "none" : "brightness(0)",
              transition: "filter 0.3 ease-in-out",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default PokemonDisplay;
