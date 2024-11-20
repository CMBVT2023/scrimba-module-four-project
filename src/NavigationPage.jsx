import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ReturnButton } from './ReturnButton'
import { Home } from './Home'
import { FunFactsPage } from './fun-facts-project/FunFactsPage'
import { NotesPage } from './notes-project/NotesPage'
import { TenziesPage } from './tenzies-project/TenziesPage'
import './styles.css'

export function NavigationPage() {

    return (
      <>
        <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home />}/>  
              <Route path='/funFactsPage' element={<FunFactsPage />}/>  
              <Route path='/notesPage' element={<NotesPage />}/>  
              <Route path='/tenziesPage' element={<TenziesPage />}/>  
            </Routes>  
          <ReturnButton />
        </BrowserRouter>
      </>
    )
}

