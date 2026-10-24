import useStore from "../../store/zustand/useStore";

function CounterZustand() {
  const count = useStore((state) => state.count);
  const increment = useStore((state) => state.increment);
  const decreament = useStore((state) => state.decreament);
  const reset = useStore((state) => state.reset);

  return (
    <div className="card">
      <h2>🐻 Zustand State Demo</h2>
      <p style={{ color: "#94a3b8" }}>
        مفصول في <code>src/store/zustand/useStore.js</code> بدون الحاجة لـ Provider
      </p>

      <p className="highlight-val">
        Zustand Counter: <span>{count}</span>
      </p>

      <div className="btn-group">
        <button className="primary-btn" onClick={increment}>
          + Increment
        </button>
        <button onClick={decreament}>- Decrement</button>
        <button className="danger-btn" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default CounterZustand;
