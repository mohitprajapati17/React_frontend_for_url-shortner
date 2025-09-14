import React from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
function ShortenUrlPage() {
    const {url}=useParams();

    useEffect (()=>{
        if(url ){
            window.location.href=import.meta.env.VITE_BACKEND_URL +`/${url}`

        }
    },[url])
    return <p>Redirecting...</p>;

}

export default ShortenUrlPage