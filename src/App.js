import logo from './logo.svg';
import './App.css';
import { useEffect, useState, useRef } from 'react';
import { getAllPokemonList } from './api/pokemon';
import { Button } from '@mui/material';
import { databaseRef } from "./api/firebase.js"
import { ref, set, onValue, query } from "firebase/database";
import { onPlayerJoin, isHost, myPlayer, useMultiplayerState, usePlayersList } from "playroomkit";
import { get_room_code } from './api/multiplayer.js';


function App() {
  const initialized = useRef(false)
  const players = usePlayersList();
  const [gameState, setGameState] = useState({})
  //const [count, setCount] = useMultiplayerState('count', 0);

  let get_details = () => {
    //console.log(myPlayer())
    let player_id = get_player_id()
    let room = get_room_code()
    let is_player_host = isHost()
    let name = myPlayer().state.profile.name
    console.log(name)
    return { player_id, room, is_player_host, name }
  }

  useEffect(() => {
    if (!initialized.current) {
      let { player_id, room, is_player_host, name } = get_details()
      set_data(`rooms/${room}/players/${player_id}`, { player_id, room, is_player_host, name })
      set_data(`rooms/${room}/count/`, players.length)
      initialized.current = true
      const q = query(ref(databaseRef, `rooms/${room}/`));

      onValue(q, data => {
        //console.log(data.val())
        setGameState(() => { return data.val() })
        //console.log(gameState)
      })

    }

    const onbeforeunloadFn = () => {
      let { player_id, room, is_player_host } = get_details()
      set_data(`rooms/${room}/players/${player_id}`, null)


      // If no more players delete room
      if (players.length - 1 < 1) {
        set_data(`rooms/${room}/`, null)
      } else {
        set_data(`rooms/${room}/count/`, players.length - 1)
      }
    }

    window.addEventListener('beforeunload', onbeforeunloadFn);
    return () => {
      window.removeEventListener('beforeunload', onbeforeunloadFn);
    }

  }, [])

  let get_player_id = () => {
    let id = myPlayer().id
    //console.log(players, players.length)
    //console.log(gameState)
    return id
  }

  let set_data = (path, payload) => {
    set(ref(databaseRef, path), payload);
  }

  let get_other_player_results = () => {

    try {
      //console.log(gameState)
      //console.log(players)
      return (
        <div>
          {
            Object.keys(gameState.players).map((key, i) => (
              <div key={key}><h3>{gameState.players[key].name} <span style={{ "color": "blue" }}>{gameState.players[key].result > 1 ? gameState.players[key].result : ""}</span></h3></div>
            ))
          }
        </div>
      )
    } catch (error) {
      //console.log(error)
    }


  }

  let get_player_results = () => {
    //console.log(get_player_id())

    try {
      if (parseInt(gameState.players[get_player_id()].result) > 0) {
        return gameState.players[get_player_id()].result
      } else {
        return null
      }

      //return gameState.players[get_player_id()].results ? gameState.players[get_player_id()].results : ""
    } catch (error) {
      //console.log(error)
      return ""
    }

    return ""
  }

  let tap = () => {
    //let id = "uid1234"
    //set_data(`client/${id}/`, { sent_time: Date.now(), id: id, })
    let { player_id, room, is_player_host } = get_details()
    set_data(`rooms/${room}/players/${player_id}/touch`, Date.now())
  }

  return (
    <div style={{ height: "100vh", justifyContent: 'center', display: 'flex', alignItems: "center" }}>
      <div style={{ width: "200px", height: "200px", alignItems: "center", justifyContent: "center", display: 'flex', flexDirection: "column" }}>
        <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: "center" }}>
          <h1>{gameState.state}</h1>
        </div>
        <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: "center" }}>
          <Button variant="outlined" sx={{ color: "black", borderColor: "black", minWidth: "25vw", minHeight: "25vw", fontSize: "5vw" }} onClick={tap}>Tap</Button>
        </div>
        <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: "center" }}>
          <h3>{get_player_results() ? "My Score: " + get_player_results() + "s" : ""}</h3>
        </div>

        {get_other_player_results()}
      </div>
    </div>
  );
}

export default App;
