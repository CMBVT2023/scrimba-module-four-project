import React from "react";
import { NavBar } from "./components/NavBar";
import { Main } from "./components/Main";
import "./FunFactsStyles.css"

export function FunFactsPage() {

    return (
        <div className="container">
            <NavBar />
            <Main />
        </div>
    )
}