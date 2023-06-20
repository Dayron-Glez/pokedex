import { Pokemon, PokemonPage } from "../models/pokemon";
import axiosInstance from "./axiosInstance";

export async function getPokemon(name:string) {
    const response = await axiosInstance.get<Pokemon>("/pokemon/" + name);
    return response.data;
}

export async function getPokemonPage(page:number) {
    const pageSize = 12; // número de pokemon a mostrar por página
    const response = await axiosInstance.get<PokemonPage>(`/pokemon?limit=${pageSize}&offset=${pageSize * (page - 1)}`)
    return response.data;
}