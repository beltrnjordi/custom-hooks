import { useReducer, useEffect } from "react"
import { todoReducer } from "../08-useReducer/todoReducer";

export const useTodos = (initialState = {}) => {

    // Función init para el reducer, retorna los valores almacenados en el localStorage si existen
    const init = () => {
        return JSON.parse(localStorage.getItem('todos')) || [];
    }

    const [todos, dispatch] = useReducer(todoReducer, initialState, init);
    
    // Cuando el componente se monta y cuando se actualiza todos se actualiza el localStorage
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos])
    
    
    const handleNewTodo = (todo) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }

        dispatch( action ); // Dispatch envía el action al reducer
    }

    const handleDeleteTodo = (id) => {
        dispatch({
            type: '[TODO] Remove Todo',
            payload: id
        });
    }

    const handleToggleTodo = (id) => {
        console.log(id);
        dispatch({
            type: '[TODO] Toggle Todo',
            payload: id
        })
    }

    const todosCount = todos.length;

    const pendingTodosCount = todos.filter(todo => !todo.done).length;

    return {
        ...todos,
        todos,
        handleToggleTodo,
        handleDeleteTodo,
        handleNewTodo,
        todosCount,
        pendingTodosCount
    }
}
