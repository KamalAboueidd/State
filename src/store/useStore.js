import create from "zustand";

  
  const useStore = create((set)=> ({  // create a store with zustand
       count : 0 ,
      increment : ()=> set((state) => ({count : state.count + 1})),
       decreament : () => set ((state) => ({count : state.count - 1}))
      })) 


// 
  