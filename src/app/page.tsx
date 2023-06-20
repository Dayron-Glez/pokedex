'use client'

import PokemonEntry from "@/components/PokemonEntry";
import useSWR from 'swr'
import * as PokemonApi from '@/app/network/pokemon-api';
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { useRouter, usePathname, useSearchParams } from 'next/navigation'



export default function Home() {
    const router = useRouter();
    const pathname = usePathname()
	  const searchParams = useSearchParams()
    const page = searchParams.get('page') || "1";
    const { data, isLoading } = useSWR(["getPokemonPage", page], () => PokemonApi.getPokemonPage(parseInt(page)))
    if (isLoading) return <Spinner animation="border" className="d-block m-auto"/>
  return (
    <div>
      <h1 className="text-center mt-4 mb-4">Gotta cahe &apos;em all</h1>
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {data?.results.map(pokemonEntry => (
          <Col key={pokemonEntry.name}>
            <PokemonEntry name={pokemonEntry.name}/>
          </Col>
        ))}
      </Row>
      <div className="d-flex justify-content-center gap-2 mt-4">
      {data?.previous &&
					<Button onClick={() => {
						router.push(`/${pathname}?page=${parseInt(page) - 1}`)
					}}>
						Previous page
					</Button>
				}
        
        {data?.next &&
					<Button onClick={() => {
						router.push(`/${pathname}?page=${parseInt(page) + 1}`)
					}}>
						Next page
					</Button>
				}
      </div>      
    </div>
  )
}
