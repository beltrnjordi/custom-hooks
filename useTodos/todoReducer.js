
export const todoReducer = (initialState, action) => {
    switch (action.type) {
        case '[TODO] Add Todo':
            return [...initialState, action.payload];

        case '[TODO] Remove Todo':
            return initialState.filter(todo => todo.id !== action.payload); //Filtrar por el todo cuyo id sea distinto al que queremos eliminar
        
        case '[TODO] Toggle Todo':
            return initialState.map( todo => {
                if(todo.id === action.payload){ // El payload incluye el id, no el todo completo
                    return{
                        ...todo,
                        done: !todo.done
                    }
                }    
                return todo;
            });
            
        default:
            return initialState;
    }
}