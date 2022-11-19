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

    console.log(locations)

    const searchPokemon = () => {
        navigate(`/characters/${characterPokemon}`)
    }
    
    const filterType = (e) =>{
        const url = e.target.value
        axios.get(url)
             .then(res =>setCharacters(res.data.pokemon))
    }
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
            {characters.map(pokemon => (
               <CharacterPoke 
               url={pokemon.url ? pokemon.url : pokemon.pokemon.url} 
               key={pokemon.url ? pokemon.url : pokemon.pokemon.url} 
               />
            ))}
            
            </ul>
          
        </div>
    );
};
// pokemon.url
// pokemon.pokemon.url

export default Characters;