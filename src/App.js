import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { getAllPokemonList } from './api/pokemon';
import { Button } from '@mui/material';
import { databaseRef } from "./api/firebase.js"
import { ref, set } from "firebase/database";

//import { ref, set } from "firebase"


function App() {
  useEffect(() => {
    /*
    async function fetchData() {
      const data = await getAllPokemonList();
      setPokemonData(data?.results);
    }

    fetchData();
    */
  }, [])

  let tap = () => {
    let id = "uid1234"
    set(ref(databaseRef, `client/${id}/`), {
      sent_time: Date.now(),
      id: id,
    });


  }

  return (
    <div style={{ height: "100vh", justifyContent: 'center', display: 'flex', alignItems: "center" }}>
      <div style={{ width: "200px", height: "200px", alignItems: "center", justifyContent: "center", display: 'flex', flexDirection: "column" }}>
        <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: "center" }}>
          <h1></h1>
        </div>
        <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: "center" }}>
          <Button variant="outlined" sx={{ color: "black", borderColor: "black", minWidth: "25vw", minHeight: "25vw", fontSize: "5vw" }} onClick={tap}>Tap</Button>
        </div>
      </div>
    </div>
  );
}

export default App;
