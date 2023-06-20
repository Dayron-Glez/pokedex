export interface Pokemon {
    name: string,
    types: {
        type: {
            name:string
        }
    }[],
    weight:number,
    height:number,
    sprites: {
        other: {
            "official-artwork":{
                front_default:string
            }
        }
    }
}

export interface PokemonPage {
    results: {name:string}[],
    next: string | null,
    previous: string | null,
}