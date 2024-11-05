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
            </ul>
        </div>
    )
}