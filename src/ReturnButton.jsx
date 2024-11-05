import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function ReturnButton() {
    const navigation = useNavigate()
    const userLocation = useLocation();

    const [atHomePage, setAtHomePage] = useState(true)

    useEffect(() => {
        setAtHomePage(userLocation.pathname == '/')
    }, [userLocation])

    function navigateHome() {
        navigation('/');
    }

    return (
        <>
            {!atHomePage && <button onClick={navigateHome}>Return To Project List</button>}
        </>
    )
}