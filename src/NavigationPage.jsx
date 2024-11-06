import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ReturnButton } from './ReturnButton'
import { Home } from './Home'
import { FunFactsPage } from './fun-facts-project/FunFactsPage'
import { NotesPage } from './notes-project/NotesPage'
import './styles.css'

export function NavigationPage() {

    return (
      <>
        <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home />}/>  
              <Route path='/funFactsPage' element={<FunFactsPage />}/>  
              <Route path='/notesPage' element={<NotesPage />}/>  
            </Routes>  
          <ReturnButton />
        </BrowserRouter>
      </>
    )
}

