import { useRef, useState, type FormEvent } from "react";
import { GameState } from "../hooks/use-game-manager";
import type { Pokemon } from "../interface/pokemon.interface";

interface Props {
  handlePokemonNameSubmit: (userInput: string) => void;
  gameState: GameState;
  pokemon: Pokemon | null,
}

const PokemonForm = ({ handlePokemonNameSubmit, gameState, pokemon }: Props) => {
  const [inputValue, setInputValue] = useState<string>("");

  const audioRef = useRef<HTMLAudioElement | null>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      console.log("Input vacio");
      return;
    }

    handlePokemonNameSubmit(inputValue.trim().toLowerCase());
    audioRef.current?.play();
    setInputValue("");
  };

  return (
    <form className="input-group my-3" onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-control"
        placeholder="¿Quién es ese Pokemón?"
        aria-label="¿Quién es ese Pokemón?"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        autoFocus
        disabled={gameState !== GameState.Playing}
      />
      <button
        className="btn btn-outline-dark"
        type="submit"
        disabled={!inputValue.trim() || gameState !== GameState.Playing}
      >
        Jugar
      </button>
      <audio ref={audioRef} src={pokemon?.crie} style={{display: "none"}}/>
    </form>
  );
};

export default PokemonForm;
