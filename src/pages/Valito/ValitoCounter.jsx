import { useSnapshot } from "valito";
import {state } from "./valito"
 
export default function ValitoCounter(){
     const snap = useSnapshot(state);
    return (
        <div>   
            <h1>Valito Counter { snap.count}</h1>
            <p>User name {snap.user.name}</p>
            <button onClick={() => state.cout++}>Increment</button>
            <button onClick={()=> state.user.name = "kamal abou eid "}>Change name</button>
        </div>
    )
}