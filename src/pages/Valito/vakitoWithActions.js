


export const state = proxy({
      them : "light",
      todos : [
      { id: 1, text: 'Learning valito Fundemental', completed: true },
        { id: 2, text: ' Building to do app with Clint state project', completed: false }
      ]
})

export const AppActions = {
     toggletheme : () => {
         state.theme == state.them == "light" ? "dark"  : "light" ;
     },
      addTodo: (text) => {
        if (!text.trim()) return;
        appState.todos.push({
            id: Date.now(),
            text: text,
            completed: false
        });
        appState.newTodoText = ''; 
    },
     toggleTodo  : (id)=> {
               const todo =  state.todos.find((dd) => dd.id === id);
               if(todo )
               {
                 todo.completed = !todo.completed ;
               }
            }
}