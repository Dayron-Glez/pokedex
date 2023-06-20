'use client'
import usePokemon from "@/app/hooks/useSWR";
import Link from "next/link";
import styles from "@/app/styles/PokemonEntry.module.css";
import { Spinner } from "react-bootstrap";
import Image from "next/image";
export default function PokemonEntry( {name} : { name: string }){
const {pkm, pkmLoading} = usePokemon(name);

return (
    <Link href={"/" + name}>
        <div className={styles.entry}>
            {pkmLoading && <Spinner animation="grow"/>}
            {pkm &&
               <div className={styles.card}>
                <h1 className="text-center text-capitalize">{pkm.name}</h1>
                <Image
                    src={pkm.sprites.other["official-artwork"].front_default}
                    alt={"Pokemon: " + pkm.name}
                    height={200}
                    width={200}
                />
               </div>
            }
        </div>
    </Link>
)
}