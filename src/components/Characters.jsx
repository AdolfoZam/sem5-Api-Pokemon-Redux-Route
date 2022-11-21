import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CharacterPoke from './CharacterPoke';

const Characters = () => {

    const UserName = useSelector(state =>state.name)
    const [characters,setCharacters] = useState([])
    const [characterPokemon,setCharacterPokemon] = useState("")//estado para pokemones
    const [locations,setLocations] =useState([])//estado para pokemones por tipo
    const [suggestion,setSuggestion] = useState([])//estado para sugerencia
    const navigate = useNavigate()//navigate para buscar los pokemones en serach

    useEffect(() => {//para detectar lo escrito en el input y realizar sugeridos
        if(characterPokemon){
        axios.get(`https://pokeapi.co/api/v2/pokemon/${characterPokemon}/`)
             .then(res => setSuggestion(res.data))
        }
    },[characterPokemon])//estoy detectando cada que escriben en el input
console.log(suggestion)

    useEffect(() => {// para buscar los pokemones
        axios.get("https://pokeapi.co/api/v2/pokemon/")
             .then(res => setCharacters(res.data.results))
    
        axios.get("https://pokeapi.co/api/v2/type/") //para seleccionar el tipo de pokemones
             .then(res => setLocations(res.data.results))
    },[])

    // console.log(locations)

    const searchPokemon = () => {
        navigate(`/characters/${characterPokemon}`)
    }
    // https://pokeapi.co/api/v2/pokemon/{id or name}/
    const filterType = (e) =>{
        const url = e.target.value
        axios.get(url)
             .then(res =>setCharacters(res.data.pokemon))
    }
    const [page,setPage ] = useState(1)//estado declarada para paginacion
    const pokemonsperpage=5//variable por pagina
    const lastIndex= page*pokemonsperpage//variable para devolverse
    const firstIndex= lastIndex - pokemonsperpage//variable para avanzar
    const PokemonPaginated = characters.slice(firstIndex, lastIndex)//cortar y separar por cantidad
    const totalPages=Math.ceil(characters.length/pokemonsperpage)//variable para ultimas paginas
    const numbers = []//arreglo para mostrar los numeros que salen despues de la division 
    for(let i=1;i<=totalPages;i++){//for que recorre e ingresa las paginas
        numbers.push(i)
    }
    // console.log(numbers)
    return (
        <div>
            <h1>Pokedex</h1>
            <p><b>Welcome </b>{UserName} here you can find your favorite Pokemon</p>
            <div>
            <input 
            type="text"
            placeholder='Search Pokemon'
            value={characterPokemon} // este input es utlizado para capturar y ralizar la busqueda
            onChange={e => setCharacterPokemon(e.target.value)}
            />
            <button onClick={searchPokemon}>
            <i class="fa-brands fa-searchengin"></i>
            </button>
            <select onChange={filterType} name="" id="">
                {locations.map(type => (//map para el tipo de pokemon y el botoon que realiza la busqueda
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
            {PokemonPaginated.map(pokemon => (//map para paginacion
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
                {numbers.map(number =>(//map para arreglo de numeros despues de la paginacion
                    <button onClick={() => setPage(number)}>{number}</button>
                ))}
             <button 
             onClick={() => setPage(page+1)}
             disabled={page===totalPages}>
                Next</button>
                {/* {suggestion.map(sugges =>(
                    <li>{sugges.name}</li>
                ))} */}
          </div>
        </div>
    );
};
// pokemon.url
// pokemon.pokemon.url

export default Characters;