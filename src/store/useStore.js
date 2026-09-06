// import {create} from "zustand";
// import { devtools, persist, subscribeWithSelector  } from "zustand/middleware";

  
//  const useStore = create((set)=> ({  // create a store with zustand
//       // defult (initial) values for the store
//        count : 0 ,
//        // actions to update the store values
//       increment : ()=> set((state) => ({count : state.count + 1})),
//        decreament : () => set ((state) => ({count : state.count - 1}))
//       })) 
//  export default useStore;



//    // old way creating actions and state in zustand , now no spread operator is needed to update the state in zustand
//     // items: [],
//     // addItem: (item) => set((state) => ({ items: [...state.items, item] })),
//     //  removeItem : (iteme) => set((state) => ({items : state.items.filter((item)=> item !== iteme) }))
 
 
//   // immer => make a zustand store with immer to make the state immutable and update the state without spread operator
// //     export const useArray = create(
// //    // immer make sense of immutability and update the state without spread operator (Like You Wrote vanilla JSs)
// //     immer((set) => ({
// //     todos: [],
// //  addTodo: (newTodo) => 
// //       set((state) => {
// //         state.todos.push(newTodo); // Zustand/Immer هيظبطها ويزبط الـ Immutability لوحده!
// //       }),
// //   }))
// // );
// // // new store with immer to make the state immutable and update the state without spread operator
// // immer((set) => ({
// //    rodos :[],
// // }))

// // store slice pattern in zustand to split the store into multiple slices and combine them together

//  export const crearteAuthlice = (set)=> ({
//         user : null , 
//         login : (user) => set((state) => ({user : state.user = user})),
//         logout : () => set((state) => ({user : state.user = null}))
//  })
// export const createCartSlice = (set) => ({
//      cart :[],
//       addToCart : (item) => set((state) => ({cart : [...state.cart , item]})),
//       removeFromCart : (item) => set((state) => ({cart : state.cart.filter((i)=> i !== item)}))
// })
// //combine the slices together to create a store

// //  import { create } from 'zustand';
// // import { createAuthSlice } from './authSlice';
// // import { createCartSlice } from './cartSlice';

// export const useBoundStore = create((...a) => ({
//   ...crearteAuthlice(...a),
//   ...createCartSlice(...a),
// }));
//  // ...a is  make one object with all the slices and pass it to the create function of zustand to create a store with all the slices combined together 
//  // ex {
//  //  user : null,                 ====>  from createAuthSlice
// //  login : (user) => set((state) => ({user : state.user = user})), ===> from createAuthSlice
// //  logout : () => set((state) => ({user : state.user = null})),  ===> from createAuthSlice
// //  cart :[],  // ===> from createCartSlice
// // addToCart : (item) => set((state) => ({cart : [...state.cart , item]})),
// // removeFromCart : (item) => set((state) => ({cart : state.cart.filter((i)=> i !== item)}))
// //}


// // access the store values and actions (directly) in the component using the useStore hook 

// // import React from 'react';
// // import { useBoundStore } from './useBoundStore'; // استدعاء الـ Root Store المجمع
// // import { useShallow } from 'zustand/react/shallow';

// // function HeaderComponent() {
// //   // 1. الاستدعاء بالطريقة الفردية (الأعلى أداءً)
// //   const user = useBoundStore((state) => state.user); // access the user state from the store(BoundStore) directly
// //   const logout = useBoundStore((state) => state.logout);

// //   // // 2. أو الاستدعاء بـ useShallow لو عايز تسحب حاجات كتير تخص الـ Cart مثلاً في سطر واحد
// //   // const { cart, addToCart } = useBoundStore(
// //   //   useShallow((state) => ({
// //   //     cart: state.cart,
// //   //     addToCart: state.addToCart,
// //   //   }))
// //   // );

// //   return (
// //     <header>
// //       {user ? (
// //         <span>مرحباً، {user.name} <button onClick={logout}>خروج</button></span>
// //       ) : (
// //         <span>غير مسجل الدخول</span>
// //       )}
// //       <div>عربة التسوق: {cart.length} منتجات</div>
// //     </header>
// //   );
// // }

// // export default HeaderComponent;
 
   
//  export const  useAuthStor = create(
//    persist(
//      (set) => ({
//           user : null ,
//           token : null,
//            setAuth : (user , token) => set({user , token}),
//            logout : ()=> set({user : null , token : null}) 
//      }), 
//      {
//           name : 'auth-storage',  // storage key
//           pertialize : (state)=> ({user : state.user}), // only presist user 
//            version : 1,
          
//      }
//    )
//  )
//  // presist Middleware  (Local Storage)


//  // subscribeWithSelector  : Monitor(track) specific variable (value ) in th store
//      export const useStore3 = create(
//         subscribeWithSelector((set) => ({
//              count : 0 ,
//               increamet : set((state) => ({count : state.count +1 }))
//         }))
//      )
//       // in the Component (if you wanna track Counter value);  good with Anyltics , call outside Server 
//   useStore3.subscribe(
//      (state)=> state.count,
//      (currentCount , previousCount)=> {
//        console.log(`the Counter Changed From ${previousCount} to ${currentCount}`);
//      }
//   )   


//    //Redux DevTool (Work also With Zustand) : track every action happen and when , and made time travel for state.

//     export const useStore4 = create(
//       devtools(
//         (set)=> ({
//             count :  0 ,
//             increase : () =>  set((state) => ({ count : state.count + 1}) , false ,'counter/increament') 
//         }),
//         {name : 'Awsem Store4'}  // that will apper in the devTools 
//       )
//     )
    