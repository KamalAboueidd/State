import { useShallow } from 'zustand/shallow';
import  useStore from '../store/useStore';

function Counter(){
   
    //   const {count , increment , decreament} = useStore();    // bad practice (bad Performance)
        //  const {count , increment , decreament} = useStore(
        //      useShallow((state) => ({
        //             count : state.count,
        //             increment : state.increment,
        //             decreament : state.decreament
        //      }))
        //  )
         const count = useStore((state) => state.count);
         const increment = useStore((state) => state.increment);
         const decreament = useStore((state) => state.decreament);
    return (
        <div>
            <h1>Counter : {count}</h1>
            <button onClick={increment}>Increment</button>
            <button onClick={decreament}>Decrement</button>
        </div>
    )
}
export default Counter;