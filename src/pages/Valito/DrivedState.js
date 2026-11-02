import { proxy } from 'valtio';

export const state = proxy({
    todos: [
        { id: 1, text: ' Learning Valito', completed: true },
          {id : 2 , text : ' eat' , completed : false}
    ],

       // drived state 
        // get keyword before fun name make use the function as properity without ()  .
    get completedCount() {
        return state.todos.filter(todo => todo.completed).length;
    },

    get remainingCount() {
        return state.todos.length - state.completedCount;
    }
});