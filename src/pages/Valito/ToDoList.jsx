import { useSnapshot } from 'valtio';
import { state, appActions } from '.vakitoWithActionse';

export default function TodoList() {

    const snap = useSnapshot(state);

    return (
        <div style={{ padding: '20px' }}>
            <h3> to do list</h3>


            <div style={{ marginBottom: '15px' }}>

                <input
                    type="text"
                    value={snap.newTodoText}
                    onChange={(e) => {

                        appState.newTodoText = e.target.value;
                    }}
                    placeholder="new Todo List"
                />
                <button onClick={() => appActions.addTodo(snap.newTodoText)}>
                    add
                </button>
            </div>


            <ul>
                {snap.todos.map(todo => (
                    <li
                        key={todo.id}
                        onClick={() => appActions.toggleTodo(todo.id)}
                        style={{
                            cursor: 'pointer',
                            textDecoration: todo.completed ? 'line-through' : 'none'
                        }}
                    >
                        {todo.text}
                    </li>
                ))}
            </ul>
        </div>
    );
}