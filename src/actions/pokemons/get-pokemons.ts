import { pokeApi } from "../../config/api/pokeApi";
import type { Pokemon } from "../../domain/entities/pokemon";
import type { PokeAPIPaginatedResponse, PokeAPIPokemon } from "../../infrastructure/interfaces/pokeapi.interface";
import { PokemonMapper } from "../../infrastructure/mappers/pokemon.mapper";




export const getpokemons = async( page: number, limit: number = 20 ): Promise<Pokemon[]> => {
    try {

        const url = `/pokemon=?offset=${ page * 10 }&limit=${limit}`;
        const {data} = await pokeApi.get<PokeAPIPaginatedResponse>(url)

        console.log({data})

        const pokemonPromises = data.results.map((info) => {
            return pokeApi.get<PokeAPIPokemon>(info.url)
        })

        const pokeApiPokemons = await Promise.all(pokemonPromises);
        const pokemons = pokeApiPokemons.map((item) => PokemonMapper.pokeApiPokemonToEntity(item.data));

        return pokemons;
    } catch (error) {
        throw new Error('Error getting pokemons')
    }
}