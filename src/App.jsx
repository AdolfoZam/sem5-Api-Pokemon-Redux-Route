import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import InputName from './components/InputName'
import Characters from './components/Characters'
import CharacterDetail from './components/CharacterDetail'
import ProtectedRoutes from './components/ProtectedRoutes'
import { createContext, useState } from 'react'



function App() {
  



  return (

        <HashRouter>
    
<div className="App">
    <Routes>
      <Route path='/' element={<InputName/>}/>

      <Route element={<ProtectedRoutes/>}>
      <Route path='/characters' element={<Characters/>}/>
      <Route path='/characters/:id' element={<CharacterDetail/>}/>
      </Route>
      
      </Routes>  
      </div>
     
    </HashRouter>
    )
}

export default App
