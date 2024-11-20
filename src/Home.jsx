import React from "react";
import { Link } from "react-router-dom";

export function Home() {
    return (
        <div>
            <h1>Project List</h1>
            <ul>
                <li>
                    <Link to={'/funFactsPage'}>Fun Facts About React</Link>
                </li>
                <li>
                    <Link to={'/notesPage'}>Notes App</Link>
                </li>
                <li>
                    <Link to={'/tenziesPage'}>Tenzies Game</Link>
                </li>
            </ul>
        </div>
    )
}