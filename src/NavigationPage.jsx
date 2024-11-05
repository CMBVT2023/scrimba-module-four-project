import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ReturnButton } from './ReturnButton'
import { Home } from './Home'
import { FunFactsPage } from './FunFactProject/FunFactsPage'

export function NavigationPage() {

    return (
      <>
        <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home />}/>  
              <Route path='/funFactsPage' element={<FunFactsPage />}/>  
            </Routes>  
          <ReturnButton />
        </BrowserRouter>
      </>
    )
}

