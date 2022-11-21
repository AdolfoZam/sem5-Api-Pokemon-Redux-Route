import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CharacterPoke = ({url}) => {

    const [character,setCharacter]= useState({})

    useEffect(() => {
        axios.get(url)
             .then(res => setCharacter(res.data))
    },[])

    console.log(character)
    return (
        <Link to={`/characters/${character.id}`}>
            <h1>{character.name}</h1>
            <img src={character.sprites?.other.home.front_default} alt="" />
            <div>
                    <span><b>Height:</b>{character.height}</span>
            </div>
            <div>
                    <span><b>Moves:</b>{character.moves?.[0].move.name}</span>
            </div>
            <div>
                    <span><b>Ability:</b>{character.abilities?.[0].ability.name}</span>
            </div>
            <div>
                    <span><b>Weight:</b>{character.weight}</span>
            </div>
        </Link>
    );
};

export default CharacterPoke;