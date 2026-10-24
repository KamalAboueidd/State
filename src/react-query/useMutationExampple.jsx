import { useState } from 'react';
import { 
    useQuery, 
    useMutation, 
    useQueryClient, 
    useIsFetching, 
    useIsMutating 
} from '@tanstack/react-query';
import axios from 'axios';

const fetchTodos = async ({ queryKey }) => {
    // Accessing queryKey parameters passed from useQuery
    const [, filter] = queryKey;
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos', {
        params: { _limit: 5, completed: filter === 'completed' ? true : filter === 'active' ? false : undefined }
    });
    return response.data;
};

const addTodoItem = async (newTodo) => {
    const response = await axios.post('https://jsonplaceholder.typicode.com/todos', newTodo);
    return response.data;
};

const updateTodoItem = async (updatedTodo) => {
    const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${updatedTodo.id}`, updatedTodo);
    return response.data;
};

const deleteTodoItem = async (id) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    return id;
};

export default function CompleteReactQueryComponent() {
    const [filter, setFilter] = useState('all');
    const [newTitle, setNewTitle] = useState('');
    const queryClient = useQueryClient();

    // ------------------------------------------
    // A. Global State Hooks (Less common / Monitoring)
    // ------------------------------------------
    // Returns the number of active queries currently fetching across the entire application
    const globalIsFetchingCount = useIsFetching();
    
    // Returns the number of active mutations currently in progress across the entire application
    const globalIsMutatingCount = useIsMutating();

    // ------------------------------------------
    // B. useQuery with Advanced Properties
    // ------------------------------------------
    const {
        data: todos,
        isLoading,
        isError,
        error,
        isFetching,
        isStale,
        status,
        fetchStatus,
        refetch,
        dataUpdatedAt
    } = useQuery({
        // Array queryKey incorporating filters for automatic cache segmentation
        queryKey: ['todos', filter],
        queryFn: fetchTodos,
        // Keeps data fresh in cache for 2 minutes before marking it stale
        staleTime: 1000 * 60 * 2,
        // Keeps unused cache in memory for 10 minutes before garbage collection
        gcTime: 1000 * 60 * 10,
        // Automatically refetches data when the browser window regains focus
        refetchOnWindowFocus: true,
        // Retries failed requests up to 3 times before throwing an error
        retry: 3,
        // Custom delay between retry attempts
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        // Select transformation: allows selecting or transforming returned data structure on the fly
        select: (data) => data.map(todo => ({ ...todo, titleUppercase: todo.title.toUpperCase() }))
    });

    // ------------------------------------------
    // C. useMutation: Add Item (POST) with Advanced Lifecycles
    // ------------------------------------------
    const addMutation = useMutation({
        mutationFn: addTodoItem,
        // Executed before the mutation function runs (used for Optimistic Updates)
        onMutate: async (newTodoVariables) => {
            // Cancel any outgoing refetches so they don't overwrite our optimistic update
            await queryClient.cancelQueries({ queryKey: ['todos', filter] });

            // Snapshot the previous value
            const previousTodos = queryClient.getQueryData(['todos', filter]);

            // Optimistically update to the new value
            queryClient.setQueryData(['todos', filter], (old = []) => [
                { id: Date.now(), title: newTodoVariables.title, completed: false, titleUppercase: newTodoVariables.title.toUpperCase() },
                ...old,
            ]);

            // Return a context object with the snapshotted value
            return { previousTodos };
        },
        // If the mutation fails, use the context returned from onMutate to rollback
        onError: (err, newTodo, context) => {
            queryClient.setQueryData(['todos', filter], context.previousTodos);
            console.error('Mutation failed, rolled back to previous state:', err.message);
        },
        // Always refetch after error or success to ensure synchronization with server
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
        onSuccess: (data) => {
            console.log('Successfully added item on server:', data);
            setNewTitle('');
        }
    });

    // ------------------------------------------
    // D. useMutation: Update Item (PUT)
    // ------------------------------------------
    const updateMutation = useMutation({
        mutationFn: updateTodoItem,
        onSuccess: () => {
            // Invalidate queries to trigger background refetching and update the UI
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        }
    });

    // ------------------------------------------
    // E. useMutation: Delete Item (DELETE) with Optimistic UI Update
    // ------------------------------------------
    const deleteMutation = useMutation({
        mutationFn: deleteTodoItem,
        onMutate: async (deletedId) => {
            await queryClient.cancelQueries({ queryKey: ['todos', filter] });
            const previousTodos = queryClient.getQueryData(['todos', filter]);

            // Filter out the deleted item immediately in the local cache
            queryClient.setQueryData(['todos', filter], (old = []) => 
                old.filter(todo => todo.id !== deletedId)
            );

            return { previousTodos };
        },
        onError: (err, deletedId, context) => {
            queryClient.setQueryData(['todos', filter], context.previousTodos);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        }
    });

    // Event Handlers
    const handleAddSubmit = (e) => {
        e.preventDefault();
        if (!newTitle.trim()) return;
        addMutation.mutate({ title: newTitle, completed: false, userId: 1 });
    };

    const handleToggleComplete = (todo) => {
        updateMutation.mutate({ ...todo, completed: !todo.completed });
    };

    // Conditional Rendering States
    if (isLoading) return <div style={{ padding: '20px' }}>Loading initial data...</div>;
    if (isError) return <div style={{ padding: '20px', color: 'red' }}>Error: {error.message}</div>;

    return (
        <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
            <h2>Advanced Complete React Query Demonstration</h2>

            {/* Global Background Activity Indicators */}
            <div style={{ background: '#f0f0f0', padding: '10px', marginBottom: '15px', borderRadius: '5px', fontSize: '14px' }}>
                <p>Global Active Queries Fetching: <strong>{globalIsFetchingCount}</strong></p>
                <p>Global Active Mutations Running: <strong>{globalIsMutatingCount}</strong></p>
            </div>

            {/* Query Status & Metadata panel */}
            <div style={{ background: '#eef2f7', padding: '10px', marginBottom: '15px', borderRadius: '5px', fontSize: '13px' }}>
                <p>Query Status: <code>{status}</code> | Fetch Status: <code>{fetchStatus}</code></p>
                <p>Is Data Stale? <strong>{isStale ? 'Yes' : 'No'}</strong> | Background Refetching: <strong>{isFetching ? 'Yes' : 'No'}</strong></p>
                <p>Last Data Update Time: {new Date(dataUpdatedAt).toLocaleTimeString()}</p>
                <button onClick={() => refetch()} style={{ marginTop: '5px', padding: '4px 8px' }}>Manual Refetch</button>
            </div>

            {/* Filters Navigation */}
            <div style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
                <button onClick={() => setFilter('all')} style={{ fontWeight: filter === 'all' ? 'bold' : 'normal' }}>All</button>
                <button onClick={() => setFilter('active')} style={{ fontWeight: filter === 'active' ? 'bold' : 'normal' }}>Active</button>
                <button onClick={() => setFilter('completed')} style={{ fontWeight: filter === 'completed' ? 'bold' : 'normal' }}>Completed</button>
            </div>

            {/* Add Todo Form */}
            <form onSubmit={handleAddSubmit} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
                <input 
                    type="text" 
                    placeholder="Enter new task..." 
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    style={{ flex: 1, padding: '8px' }}
                />
                <button type="submit" disabled={addMutation.isPending} style={{ padding: '8px 15px' }}>
                    {addMutation.isPending ? 'Adding...' : 'Add Task'}
                </button>
            </form>

            {/* Todos List Display */}
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {todos?.map(todo => (
                    <li 
                        key={todo.id} 
                        style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center', 
                            padding: '10px', 
                            borderBottom: '1px solid #ddd',
                            background: todo.completed ? '#e8f5e9' : '#fff'
                        }}
                    >
                        <span 
                            onClick={() => handleToggleComplete(todo)}
                            style={{ 
                                textDecoration: todo.completed ? 'line-through' : 'none', 
                                cursor: 'pointer',
                                flex: 1 
                            }}
                        >
                            {todo.titleUppercase}
                        </span>
                        
                        <button 
                            onClick={() => deleteMutation.mutate(todo.id)}
                            disabled={deleteMutation.isPending}
                            style={{ background: '#ff5252', color: '#fff', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '3px' }}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}