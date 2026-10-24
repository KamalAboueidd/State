import { useDispatch, useSelector } from "react-redux";
import {
  decreament,
  increament,
  increamentByAmount,
  decreamentByvalue,
} from "../../store/redux/slices/counterSliceRTK";
import { createSelector } from "@reduxjs/toolkit";

const selectCounterValue = (state) => state.counter.value;

// Memoized selector outside the component to prevent unwanted re-renders
const selectorCalc = createSelector([selectCounterValue], (currentCount) => {
  return currentCount + 2000;
});

function CounterRTK() {
  const count = useSelector(selectCounterValue);
  const selectorCalcc = useSelector(selectorCalc);
  const dispatch = useDispatch();

  return (
    <div className="card">
      <h2>Redux Toolkit Counter</h2>
      <p className="highlight-val">Current Value: <span>{count}</span></p>

      <div className="btn-group">
        <button onClick={() => dispatch(increament())}>+ Increment</button>
        <button onClick={() => dispatch(decreament())}>- Decrement</button>
      </div>

      <div className="input-group">
        <label htmlFor="inc">Increment By Value:</label>
        <input
          id="inc"
          type="number"
          placeholder="Enter number..."
          onChange={(e) => dispatch(increamentByAmount(Number(e.target.value) || 0))}
        />
      </div>

      <div className="input-group">
        <label htmlFor="dec">Decrement By Value:</label>
        <input
          id="dec"
          type="number"
          placeholder="Enter number..."
          onChange={(e) => dispatch(decreamentByvalue(Number(e.target.value) || 0))}
        />
      </div>

      <div className="calc-box">
        <strong>Memoized Calculated (+2000):</strong> {selectorCalcc}
      </div>
    </div>
  );
}

export default CounterRTK;
