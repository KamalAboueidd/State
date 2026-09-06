import { useDispatch, useSelector } from "react-redux"
import { decreament, increament, increamentByAmount , decreamentByvalue  } from "../store/counterSliceRTK";
import { createSelector } from "@reduxjs/toolkit";
  const selectCounterValue = (state) => state.counter.value 
  const selectorCalc = createSelector(  // momized selector , outside the component (No Unwanted Re-renders)
     [selectCounterValue],
     (currentCount) => {
            console.log("Calculating total price ...")
            return currentCount + 2000;
     }
 );
function CounterRTK(){
     const count = useSelector(selectCounterValue);
     const selectorCalcc = useSelector(selectorCalc);
          
     const dispatch = useDispatch(); // how send the action. 
    return(
        <div>
               <h2>The Current value is {count}</h2>
               <button onClick={()=> dispatch(increament())}>inc</button>
               <button onClick={()=> dispatch(decreament())}>dec</button>
               <br></br>
                <label htmlFor="inc">Increament By Value</label>
                <input id="inc" type="number" placeholder="ENTER THE VALUE" onChange={(e)=> dispatch(increamentByAmount(Number(e.target.value)))} />
                <br></br>
            <label htmlFor="dec" >decreament by value</label>
            <input id="dec" type="number" placeholder="Enter the value"
            onChange={(e) =>dispatch(decreamentByvalue(Number(e.target.value))) }
            ></input>

             <p>Input After Adds Calclation {selectorCalcc}</p>
        </div>
    )
}
export default CounterRTK;