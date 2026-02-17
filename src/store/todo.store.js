import { Todo } from "../todos/models/todo.model";


export const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}


const state = {
    todos: [],
    filter: Filters.All
}


const initStore = () => {
    loadStore();
    console.log('InitStore');
    
}

const getTodos = (filter = Filters.All) => {

    switch (filter) {
        case Filters.All:
            return [...state.todos];

        case Filters.Completed:
            return state.todos.filter(todo => todo.done === true);
        
        case Filters.Pending:
            return state.todos.filter(todo => todo.done === false);
    }
}


const loadStore = () => {
    if(!localStorage.getItem('state')) 
        return; // Si no posee nada el local storage, entonces no hacemos nada


    // Si existen valores en el local storage, se los asignamos a el objeto state
    const {todos = [], filters = Filters.All} = JSON.parse(localStorage.getItem('state'));

    state.todos = todos;
    state.filter = filters;

}

const saveToLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state));
}

const addTodo = ( description ) => {
    if(!description) throw new Error('No se puede cargar un todo vacio');

    state.todos.push(new Todo(description));
    saveToLocalStorage();
}

const toggleTodo = ( todoId ) => {
    state.todos = state.todos.map( todo => {
        if(todo.id === todoId) {
            todo.done = !todo.done;
        }

        return todo;
    });

    saveToLocalStorage();
}

const deleteTodo = ( todoId ) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId);
    saveToLocalStorage();
}

const deleteCompleted = () => { 

     state.todos = state.todos.filter(todo => todo.done === false);
     saveToLocalStorage();

}

const setFilter = (newFilter = Filters.All) => {
    state.filter = newFilter;
    saveToLocalStorage();
}

const getCurrentFilter = () => {
    return state.filter;
}

export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
};