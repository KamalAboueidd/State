import { proxy } from "valito";
export const state = proxy({
    user: "Ali",
count: 0,
    user: {
        name: 'kamal',
        isLoggedIn: true
    }
});
// no actions , no Reducers  no complex ways 
