import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CharacterPoke from './CharacterPoke';

const Characters = () => {

    const UserName = useSelector(state =>state.name)
    const [characters,setCharacters] = useState([])
    const [characterPokemon,setCharacterPokemon] = useState("")
    const [locations,setLocations] =useState([])
    
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("https://pokeapi.co/api/v2/pokemon/")
             .then(res => setCharacters(res.data.results))
    
        axios.get("https://pokeapi.co/api/v2/type/")
             .then(res => setLocations(res.data.results))
    },[])

    // console.log(locations)

    const searchPokemon = () => {
        navigate(`/characters/${characterPokemon}`)
    }
    
    const filterType = (e) =>{
        const url = e.target.value
        axios.get(url)
             .then(res =>setCharacters(res.data.pokemon))
    }
    const [page,setPage ] = useState(1)
    const pokemonsperpage=5
    const lastIndex= page*pokemonsperpage
    const firstIndex= lastIndex - pokemonsperpage
    const PokemonPaginated = characters.slice(firstIndex, lastIndex)
    const totalPages=Math.ceil(characters.length/pokemonsperpage)
    const numbers = []
    for(let i=1;i<=totalPages;i++){
        numbers.push(i)
    }
    // console.log(numbers)
    return (
        <div>
            <h1>yo soy un un characters</h1>
            <p>Welcome {UserName}</p>
            <div>
            <input 
            type="text"
            placeholder='Search Pokemon'
            value={characterPokemon} 
            onChange={e => setCharacterPokemon(e.target.value)}
            />
            <button onClick={searchPokemon}>Search</button>
            <select onChange={filterType} name="" id="">
                {locations.map(type => (
                    <option 
                    value={type.url}
                    key={type.name}
                    >
                        {type.name}
                    </option>
                ))}
            </select>
            </div>
            <ul>
            {PokemonPaginated.map(pokemon => (
               <CharacterPoke 
               url={pokemon.url ? pokemon.url : pokemon.pokemon.url} 
               key={pokemon.url ? pokemon.url : pokemon.pokemon.url} 
               />
            ))}
            
            </ul>
          <div>
             <button 
             onClick={() => setPage(page-1)} 
             disabled ={page===1}>
                Prev
                </button>
                {numbers.map(number =>(
                    <button onClick={() => setPage(number)}>{number}</button>
                ))}
             <button 
             onClick={() => setPage(page+1)}
             disabled={page===totalPages}>
                Next</button>
          </div>
        </div>
    );
};
// pokemon.url
// pokemon.pokemon.url

export default Characters;