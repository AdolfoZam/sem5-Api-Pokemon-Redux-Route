import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeName } from '../store/slices/name.slice';

const InputName = () => {

    const[userName,setUserName] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const enterName = () =>{
       dispatch(changeName(userName))
        navigate("/characters")
    }
    return (
        <div>
            <h1>Pokemon</h1>

            <h2>Hello Trainer!</h2>

            <h3>Give me your name to start</h3>
            <input 
            type="text" 
            placeholder='Your Name'
            onChange={e => setUserName(e.target.value)}
            value={userName}
            />
            <button onClick={enterName}>
            <i class="fa-sharp fa-solid fa-square-arrow-up-right"></i>
            </button>
        </div>
    );
};

export default InputName;