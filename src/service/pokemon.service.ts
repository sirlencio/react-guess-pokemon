import type { Pokemon } from "../interface/pokemon.interface";
import { getRandomInclusive } from "../lib/random-number";

const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon"
const MAX_POKEMON_COUNT = 649;

const fakePromise = <T>(data: T, delay: number = 1000): Promise<T> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, delay)
    })
}

const getRandomPokemon = async (): Promise<Pokemon> => {
    const randomId = getRandomInclusive(1, MAX_POKEMON_COUNT);
    const response = await fetch(`${POKEMON_API_URL}/${randomId}`)

    await fakePromise(null, 3000);

    if (!response.ok) {
        throw new Error(`Error fetching Pokemon with ID ${randomId}`)
    }

    const data = await response.json();

    return {
        id: data.id,
        name: data.name,
        image: data.sprites.other["official-artwork"].front_default,
        crie: data.cries.legacy,
    }
}

const normalizePokemonName = (name: string): string => {
    return name
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "")
}

const isPokemonNameValid = (pokemonName: string, userInput: string): boolean => {
    const normalizedPokemonName = normalizePokemonName(pokemonName);
    const normalizedUserInput = normalizePokemonName(userInput);

    return normalizedPokemonName === normalizedUserInput;
}


export const pokemonService = {
    getRandomPokemon,
    isPokemonNameValid,
}