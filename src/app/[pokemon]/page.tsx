'use client'

import Head from "next/head";
import Link from "next/link";
import { Spinner } from "react-bootstrap";
import Image from "next/image";
import usePokemon from "../hooks/useSWR";

export const metadata = {
    title: 'Pokemon Details Page',
    
  }

interface PokemonProps {
    params: {
        pokemon:string
    }
}

export default function PokemonDetailsPage ({params: {pokemon}}: PokemonProps){
    const {pkm, pkmLoading} = usePokemon(pokemon)
    return (
        <>
            <Head>
                {pkm && <title>{`${pkm.name} - Next Pokedex`}</title>}
            </Head>

            <div className="d-flex flex-column align-items-center text-center">

                <p> <Link href="/" className="link-light">← Pokedex</Link> </p>

                {pkmLoading && <Spinner animation="grow"/>}
                {pkm === null && <p>Pokemon Not Found</p>}
                
                {pkm && 
                <>
                    <h1 className="text-center text-capitalize">{pkm.name}</h1>
                    <Image
                        src={pkm.sprites.other["official-artwork"].front_default}
                        alt={"Pokemon:" + pkm.name}
                        width={400}
                        height={400}
                    />
            <div className="d-inline-block mt-2">
               <div><strong>Types: </strong>{ pkm?.types.map(type => type.type.name).join(", ")}</div>
               <div><strong>Height: </strong>{pkm?.height * 10} cm </div>
               <div><strong>Weight: </strong>{pkm?.weight / 10} kg </div>
            </div>
                </>
                }
            </div>

        </>
    )
}