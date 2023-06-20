import useSWR from "swr";
import * as PokemonApi from '../network/pokemon-api';
import {AxiosError} from 'axios'
export default function usePokemon(name : string) {
    const {data, isLoading} =useSWR(name, async () =>
        {
            try {
                return await PokemonApi.getPokemon(name)
            } catch (error) {
                if(error instanceof AxiosError && error.response?.status === 404) {
                    return null
                } else {
                    throw error
                }
            }
        }
    ) ;

    return {
        pkm: data,
        pkmLoading: isLoading,
    }
}